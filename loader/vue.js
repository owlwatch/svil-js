import ready from 'document-ready';
import deepmerge from 'deepmerge';
import {throttle} from 'throttle-debounce';

const defaults = {
	componentAttribute: 'vue-component',
	propsAttribute: 'vue-props',
	enableConfig: false,
	enableApp: false,
	components: []
};

class VueLoader {

	constructor(config){
		this.config = deepmerge( defaults, config );
		const callback = throttle( 50, () => this.parseDocument() );

		if (window.MutationObserver) {
			const observer = new MutationObserver(callback);
			observer.observe(document.documentElement, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: [`data-${this.config.propsAttribute}`]
			});
		}

		ready(callback);
	}

	parseDocument(){

		const { componentAttribute } = this.config;

		document.querySelectorAll( `[data-${componentAttribute}]` ).forEach( el => {
			this.parse(el);
		});

	}

	async parse(el){
		const componentAttribute = this.config.componentAttribute.replace(/-./g, x=>x.toUpperCase()[1]);
		const propsAttribute = this.config.propsAttribute.replace(/-./g, x=>x.toUpperCase()[1]);

		const name = el.dataset[componentAttribute];

		if ('function' !== typeof this.config.components[name]) {
			return;
		}

		const props = el.dataset[propsAttribute] ?
			JSON.parse(el.dataset[propsAttribute]) : {};

		el.removeAttribute( `data-${this.config.componentAttribute}` );

		const Vue = await this.getVue();

		const component = await this.config.components[name]();

		if( this.config.enableConfig ){
			props.config = deepmerge({}, props);
		}


		if( this.config.createApp && !this.app ){
			this.app = this.config.createApp();
		}

		if( this.app ){
			props.app = await this.app;
		}

		const v = new Vue({
			el: el,
			render: function (h) {
				return h(component.default, {props});
			}
		});

	}

	async getVue(){
		if( this.Vue ){
			return this.Vue;
		}
		if( this.config.Vue ){
			this.Vue = this.config.Vue;
		}
		else {
			this.Vue = (await import('vue')).default;
		}
		if( this.config.useEventBus && this.Vue.prototype ){
			this.Vue.prototype.$eventBus = new this.Vue()
		}
		return this.Vue;
	}

}

export default VueLoader;

import ready from 'document-ready';
import deepmerge from 'deepmerge';
import {throttle} from 'throttle-debounce';

const defaults = {
	componentAttribute: 'vue-component',
	propsAttribute: 'vue-props',
	enableConfig: false,
	enableApp: false,
	components: {},
	buffer: 50
};

class VueLoader {

	constructor(config){
		this.config = deepmerge( defaults, config );
		const callback = throttle( this.config.buffer, () => this.parseDocument() );

		if (window.MutationObserver) {
			this.observer = new MutationObserver(()=>{
				// clear the observer cache
				this.observer.takeRecords();
				callback();
			});
			this.observer.observe(document.documentElement, {
				childList: true,
				subtree: true
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

		const v = Vue.createApp ? (()=>{
			const a = Vue.createApp(component.default, props);
			a.mount(el);
			return a;
		})() : (() => new Vue({
			el: el,
			render: function (h) {
				return h(component.default, {props});
			}
		}))();

		if( window.jQuery && v.$children ){
			window.jQuery(v.$el).data('vue', v.$children[0]);
		}

	}

	async getVue(){
		if( this.Vue ){
			return this.Vue;
		}
		if( this.config.Vue ){
			this.Vue = this.config.Vue;
		}
		else if( this.config.vuePromise ){
			this.Vue = await this.config.vuePromise();
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

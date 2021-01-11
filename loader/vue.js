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
		const props = el.dataset[propsAttribute] ? 
			JSON.parse(el.dataset[propsAttribute]) : {};

		el.removeAttribute( `data-${this.config.componentAttribute}` );
		
		if (!this.config.components[name]) {
			return;
		}

		const Vue = await import('vue');

		// Add a global event bus to the Vue prototype
		if( !Vue.default.prototype.$eventBus ){
			Vue.default.prototype.$eventBus = new Vue.default();
		}
		
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

		const v = new Vue.default({
			el: el,
			render: function (h) {
				return h(component.default, {props});
			}
		});
		
	}
	
}

export default VueLoader;
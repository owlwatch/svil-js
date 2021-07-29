import documentReady from 'document-ready';
import {throttle} from 'throttle-debounce';

const defaults = {
	buffer: 50,
	observerOptions: {
		childList: true,
		subtree: true,
		attributes: true
	}
}
class LayoutLoader {

	constructor(layouts, config){
		config = config || {};

		this.config = {...defaults, ...config};
		this.layouts = layouts;

		const callback = throttle( this.config.buffer, () => {
			this.parseDocument()
		});
		if (window.MutationObserver) {
			this.observer = new MutationObserver(()=>{
				// clear the observer cache
				this.observer.takeRecords();
				callback();
			});
			this.observer.observe(
				document.documentElement,
				this.config.observerOptions
			);
		}
		documentReady(callback);
	}

	parseDocument(){
		this.layouts.forEach(async layout => {
			let nodes = [];

			if( layout.selector ){
				const selector = layout.selector.split(',').map(s => {
					return s.trim()+`:not([data-layout-rendered~="${layout.name}"])`;
				}).join(',');
				nodes = document.querySelectorAll(selector);
			}

			else if( layout.test ){
				nodes = layout.test();
			}

			if( nodes.length && layout.import ){
				Array.prototype.forEach.call( nodes, node => {
					let attr = node.getAttribute('data-layout-rendered');
					if( !attr ){
						attr = '';
					}
					let names = attr.split(' ');
					names.push(layout.name);
					node.setAttribute('data-layout-rendered', names.join(' '));
				});
				const module = await layout.import();

				Array.prototype.forEach.call( nodes, node => {
					let config = {};
					if( layout.config ){
						let attr = node.getAttribute(layout.config);
						if( attr ){
							config = JSON.parse(attr);
						}
					}
					const m = (module.default || module);
					if( m.init ) m.init(node, config);
					if( m.render ) m.render(node, config);
				});
			}
		});
	}
}
export default LayoutLoader;

import documentReady from 'document-ready';
import {throttle} from 'throttle-debounce';

class LayoutLoader {

	constructor(layouts){
		this.layouts = layouts;
		// once the page is loaded, check for layoutironment
		const callback = throttle( 50, () => this.parseDocument() );
		if (window.MutationObserver) {
			const observer = new MutationObserver(callback);
			observer.observe(document.documentElement, {
				childList: true,
				subtree: true,
				attributes: true
			});
		}
		documentReady(callback);
	}

	parse(){
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
					const m = (module.default || module);
					if( m.init ) m.init(node);
					if( m.render ) m.render(node);
				});
			}
		});
	}
}
export default LayoutLoader;
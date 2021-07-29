import ready from 'document-ready';

class EnvironmentLoader {
	constructor(environments, config){

		this.environments = environments;
		// once the page is loaded, check for environment
		ready(() => this.parse());
	}

	parse(){
		this.environments.forEach(async env => {
			let load = false;

			if( env.selector ){
				if( document.querySelector(env.selector) ){
					load = true;
				}
			}

			else if( env.test ){
				if( env.test() ){
					load = true;
				}
			}

			if( load && env.import ){
				const module = await env.import();
				(module.default || module).init();
			}
		});
	}
}
export default EnvironmentLoader;

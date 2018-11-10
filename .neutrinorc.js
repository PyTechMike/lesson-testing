module.exports = {
	use: [
		'@neutrinojs/node',
		['@atomspace/eslint', {
			eslint: {
				envs: ['browser', 'node'],
				rules: {
					semi: 'off'
				}
			}
		}],
		'@neutrinojs/jest'
// 	   function(neutrino){
// 		   let { config, options } = neutrino
  
// 		   config.resolve
// 			   .modules
// 				   .add('node_modules')
// 				   .end()
// 			   .extensions
// 				   .add('.js')
// 				   .end()
// 	   }
   ]
}
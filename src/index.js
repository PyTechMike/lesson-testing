// import extractImagesSrc from './extract-images-src';
let extractImagesSrc = require('./extract-images-src');


// extractImagesSrc(`
// 	<div>
// 		<img alt="fed" src="images/image.png" />
// 	</div>`).forEach(function (src) {
// 	console.log(src);
// });

console.log(extractImagesSrc(`
<div><img src="images/image.png" alt="fed" /></div>`));
module.exports = function extractImagesSrc (markup) {
	let result;

	// let findSrcInImg = /<img.+src=(.+).+>/g; // <img src=images/image1.png />


	// let findSrcInImg = /<img.+src=["'](.+)["'].+>/gm; // <img src=fesfs />
	let findSrcInImg = /<img.+src=(?:(["'])(.+)["']|(?!["'])(.+)).+>/gm; // <img src=fesfs />

	// let markUpWithSrcNoQuotes = '<img src=images/image.png >';

	// let markUpWithSrcDoubleQuotted = '<img src="images/image.png" />';

	// result = findSrcInImg.exec(markUpWithSrcNoQuotes);

	result = findSrcInImg.exec(markup);

	// console.log(result);
	if (result) {
		if (result[1] === undefined) {
		// return ([result[result.length - 1]]);
			return ([result[3]]);

		}
		return ([result[2]]);


		// if (result.length > 3) {
		// 	// result.forEach(function (elem, index) {

		// 	// });
		// 	result.shift();
		// 	return result;
		// }

	}
	return ([]);
};
module.exports = function extractImagesSrc (markup) {
	let resultFullInfo;
	let result = [];

	let findSrcInImg = /<img[\S\s]+src=(?:(["'])([\S\s]+?)["']|(?!["'])(\S+))[\S\s]*?\/>/gm;

	while (resultFullInfo = findSrcInImg.exec(markup)) {
		if (resultFullInfo) {
			if (resultFullInfo[1] === undefined) {
				result.push(resultFullInfo[3]);
			}
			else {
				result.push(resultFullInfo[2]);
			}
		}
	}
	return result;
};
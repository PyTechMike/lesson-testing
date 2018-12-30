module.exports = function extractImagesSrc (markup) {
	let resultFullInfo;
	let result = [];
	let findSrcInImg = /<img[\S\s]+?src=(?:["'](\S+)["']|(\S+))[\S\s]*?\/>/gm;

	while (resultFullInfo = findSrcInImg.exec(markup)) {
		if (resultFullInfo[1] === undefined) {
			result.push(resultFullInfo[2]);
		}
		else {
			result.push(resultFullInfo[1]);
		}
	}
	return result;
};
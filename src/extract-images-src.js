// export default
module.exports = function extractImagesSrc (markup) {
	let TagsRegExp = new RegExp(/<\/?[\s\w"#-/:;=?]+>/gim);
	let imgTagsRegExp = /<img src=["'](.*)["'].*>/gi;

	let allTags = markup.match(TagsRegExp);

	let matches = [];

	for (let tag in allTags) {
		console.log(tag.match(imgTagsRegExp));
	}
	return matches;
};

// g - looking for all
// m - multiline mode
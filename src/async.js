export default function wait (ms) {
	let date = new Date();

	return new Promise(function (resolve) {
		setTimeout(function () {
			resolve(new Date() - date);
		}, ms);
	});
}
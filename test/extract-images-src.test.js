import extractImagesSrc from '../src/extract-images-src';

describe('extractImagesSrc', function () {
	describe('expects', function () {
		let notMarkup, markupWithNoImage, markUpWithImageOneQuotted, markUpWithImageDoubleQuotted;
		let markUpWithImageNoQuotes, markUpWithThreeImages, markUpWithImagesMultiline, markupWithoutSrc;
		let murkupWithSrcAnyPosition, murkupSrcWithoutImgWithSrc;

		beforeEach(function () {
			notMarkup = 'Anything besides html';
			markupWithoutSrc = '<div><img/></div>';
			markupWithNoImage = '<div><p>Just some text</p></div>';
			markUpWithImageOneQuotted = "<div><img src='images/image.png' /></div>";
			markUpWithImageDoubleQuotted = '<div><img src="images/image.png" /></div>';
			markUpWithImageNoQuotes = '<img src=images/image1.png />';
			markUpWithThreeImages = '<img src="images/image1.png"/><img src="images/image2.png"/><img src="images/image3.png"/>';
			markUpWithImagesMultiline = `<div>\n<img src="images/image.png"/>\n</div>\n`;
			murkupSrcWithoutImgWithSrc = '<iframe src="images/image.html"></iframe>';
			murkupWithSrcAnyPosition = '<img width="100px" src="images/image.png"/>';
		});

		test('only HTML murkup', function () {
			expect(extractImagesSrc(notMarkup)).toEqual([]);
		});
		test('returns an array', function () {
			expect(extractImagesSrc(markUpWithImageOneQuotted)).toBeInstanceOf(Array);
		});
		test('single quotes type in attribute `src` to be supported', function () {
			expect(extractImagesSrc(markUpWithImageOneQuotted)).toEqual(['images/image.png']);
		});
		test('double quotes type in attribute `src` to be supported', function () {
			expect(extractImagesSrc(markUpWithImageDoubleQuotted)).toEqual(['images/image.png']);
		});
		test('no quotes type in attribute `src` to be supported', function () {
			expect(extractImagesSrc(markUpWithImageNoQuotes)).toEqual(['images/image.png']);
		});
		test('multiline mode to be supported', function () {
			expect(extractImagesSrc(markUpWithImagesMultiline)).toEqual(['images/image.png']);
		});
		test('markup without tag `img` to be supported', function () {
			expect(extractImagesSrc(markupWithNoImage)).toEqual([]);
		});
		test('tag `img` without attribute `src` to be supported', function () {
			expect(extractImagesSrc(markupWithoutSrc)).toEqual([]);
		});
		test('any position of attribute `src`', function () {
			expect(extractImagesSrc(murkupWithSrcAnyPosition)).toEqual(['images/image.png']);
		});
		test('any location of tag `img`', function () {
			expect(extractImagesSrc(markUpWithImageOneQuotted)).toEqual(['images/image.png']);
		});
		test('any quantity of tag `img` to be supported', function () {
			expect(extractImagesSrc(markUpWithThreeImages)).toEqual(['images/image.png']);
		});
		test('ingnoring any other attributes `src` except in tag `img`', function () {
			expect(extractImagesSrc(murkupSrcWithoutImgWithSrc)).toEqual([]);
		});
	});
});
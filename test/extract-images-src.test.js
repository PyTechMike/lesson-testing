import extractImagesSrc from '../src/extract-images-src';

describe('extractImagesSrc', function () {
	describe('expects', function () {
		let notMarkup, markupWithNoImage, markUpWithSrcOneQuotted, markUpWithSrcDoubleQuotted;
		let markUpWithSrcNoQuotes, markUpWithThreeImages, markUpWithImagesMultiline, markupWithoutSrc;
		let murkupWithSrcAnyPosition, murkupSrcWithoutImgWithSrc;

		beforeEach(function () {
			notMarkup = 'Anything besides html';
			markupWithoutSrc = '<img />';
			markupWithNoImage = '<p>Just some text</p>';
			markUpWithSrcOneQuotted = "<div><img src='images/image.png' /></div>";
			markUpWithSrcDoubleQuotted = '<img src="images/image.png" />';
			markUpWithSrcNoQuotes = '<img src=images/image1.png />';
			markUpWithThreeImages = '<img src="images/image1.png"/><img src="images/image2.png"/><img src="images/image3.png"/>';
			markUpWithImagesMultiline = `<div>\n<img src="images/image.png"/>\n</div>\n`;
			murkupSrcWithoutImgWithSrc = '<iframe src="images/image.html"></iframe>';
			murkupWithSrcAnyPosition = '<img width="100px" src="images/image.png"/>';
		});

		test('only HTML murkup', function () {
			expect(extractImagesSrc(notMarkup)).toEqual([]);
		});
		test('returns an array', function () {
			expect(extractImagesSrc(markUpWithSrcOneQuotted)).toBeInstanceOf(Array);
		});

		describe('any type of attribute `src` quotes', function () {
			test('(single) is supported', function () {
				expect(extractImagesSrc(markUpWithSrcOneQuotted)).toEqual(['images/image.png']);
			});
			test('(double) is supported', function () {
				expect(extractImagesSrc(markUpWithSrcDoubleQuotted)).toEqual(['images/image.png']);
			});
			test('(no quotes) is supported', function () {
				expect(extractImagesSrc(markUpWithSrcNoQuotes)).toEqual(['images/image.png']);
			});
			test('(multiline) is supported', function () {
				expect(extractImagesSrc(markUpWithImagesMultiline)).toEqual(['images/image.png']);
			});
		});

		describe('any ', function () {
			test('tag `img` location is supported', function () {
				expect(extractImagesSrc(markUpWithSrcOneQuotted)).toEqual(['images/image.png']);
			});
			test('tag `img` quantity is supported', function () {
				expect(extractImagesSrc(markUpWithThreeImages)).toEqual(['images/image.png']);
			});
			test('position of attribute `src` in tag `img`', function () {
				expect(extractImagesSrc(murkupWithSrcAnyPosition)).toEqual(['images/image.png']);
			});
		});

		test('markup without tag `img` is supported', function () {
			expect(extractImagesSrc(markupWithNoImage)).toEqual([]);
		});
		test('tag `img` without attribute `src` is supported', function () {
			expect(extractImagesSrc(markupWithoutSrc)).toEqual([]);
		});
		test('ingnoring any other attributes `src` except in tag `img`', function () {
			expect(extractImagesSrc(murkupSrcWithoutImgWithSrc)).toEqual([]);
		});
	});
});
import extractImagesSrc from '../src/extract-images-src';

describe('extractImagesSrc', function () {
	describe('can', function () {
		let notMarkup, markupWithNoImage, markUpWithSrcOneQuotted, markUpWithSrcDoubleQuotted;
		let markUpWithSrcNoQuotes, markUpWithThreeImages, markUpWithImagesMultiline, markupWithoutSrc;
		let murkupWithSrcAnyPosition, murkupSrcWithoutImgWithSrc;

		beforeEach(function () {
			notMarkup = 'Anything besides html';
			markupWithoutSrc = '<img />';
			markupWithNoImage = '<p>Just some text</p>';
			markUpWithSrcOneQuotted = "<img src='images/image.png' />";
			markUpWithSrcDoubleQuotted = '<img src="images/image.png" />';
			markUpWithSrcNoQuotes = '<img src=images/image.png />';
			markUpWithThreeImages = '<img src="images/image1.png"/><img src=images/image2.png /><img src="images/image3.png"/>';
			markUpWithImagesMultiline = `<div>\n<img \nsrc="images/image.png"\n/>\n</div>\n`;
			murkupSrcWithoutImgWithSrc = '<iframe src="images/image.html"></iframe>';
			murkupWithSrcAnyPosition = '<img width="100px" src="images/image.png" height="200px"/>';
		});

		describe('work with', function () {
			test('only HTML murkup', function () {
				expect(extractImagesSrc(notMarkup)).toEqual([]);
			});
			test('markup without tag `img`', function () {
				expect(extractImagesSrc(markupWithNoImage)).toEqual([]);
			});
			test('tag `img` without attribute `src`', function () {
				expect(extractImagesSrc(markupWithoutSrc)).toEqual([]);
			});
		});

		describe('find any type of attribute `src` quotes', function () {
			test('(single)', function () {
				expect(extractImagesSrc(markUpWithSrcOneQuotted)).toEqual(['images/image.png']);
			});
			test('(double)', function () {
				expect(extractImagesSrc(markUpWithSrcDoubleQuotted)).toEqual(['images/image.png']);
			});
			test('(no quotes)', function () {
				expect(extractImagesSrc(markUpWithSrcNoQuotes)).toEqual(['images/image.png']);
			});
			test('(multiline)', function () {
				expect(extractImagesSrc(markUpWithImagesMultiline)).toEqual(['images/image.png']);
			});
		});

		describe('find', function () {
			test('any tag `img` with any location', function () {
				expect(extractImagesSrc(markUpWithSrcOneQuotted)).toEqual(['images/image.png']);
			});
			test('any quantity of tags `img`', function () {
				expect(extractImagesSrc(markUpWithThreeImages)).toEqual(['images/image1.png', 'images/image2.png', 'images/image3.png']);
			});
			test('attribute `src` with any position in tag `img`', function () {
				expect(extractImagesSrc(murkupWithSrcAnyPosition)).toEqual(['images/image.png']);
			});
		});

		test('ingnore any other attributes `src` except in tag `img`', function () {
			expect(extractImagesSrc(murkupSrcWithoutImgWithSrc)).toEqual([]);
		});

		test('return an array', function () {
			expect(extractImagesSrc(markUpWithSrcOneQuotted)).toBeInstanceOf(Array);
		});
	});
});
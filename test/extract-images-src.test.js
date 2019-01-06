import extractImagesSrc from '../src/extract-images-src';

describe('extractImagesSrc', function () {
	describe('can', function () {
		let notMarkup, markupWithNoImage, markupWithSrcOneQuotted, markupWithSrcDoubleQuotted;
		let markupWithSrcNoQuotes, markupWithThreeImages, markupWithImagesMultiline, markupWithoutSrc;
		let murkupWithSrcAnyPosition, murkupSrcWithoutImgWithSrc, murkupImgWithoutEndingSlash;
		let murkupWithFakeSrc, murkupWithDataSrc, murkupImgWithoutWhitespaceBeforeClosing;

		beforeEach(function () {
			notMarkup = 'Anything besides html';
			markupWithoutSrc = '<img />';
			markupWithNoImage = '<p>Just some text</p>';
			markupWithSrcOneQuotted = "<img src='images/image.png' />";
			markupWithSrcDoubleQuotted = '<img src="images/image.png" />';
			markupWithSrcNoQuotes = '<img src=images/image.png />';
			markupWithThreeImages = '<img src="images/image1.png"/><img src=images/image2.png /><img src="images/image3.png"/>';
			markupWithImagesMultiline = `
			<div>
				<img 
					src="images/image.png"
				/>
			</div>
			`;
			murkupWithFakeSrc = '<img fakesrc="images/image.png"/>';
			murkupWithDataSrc = '<img data-src="images/image.png"/>';
			murkupImgWithoutEndingSlash = '<img src=images/image.png >';
			murkupImgWithoutWhitespaceBeforeClosing = "<img src='images/image.png'>";
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
			test('tag `img` without ending slash', function () {
				expect(extractImagesSrc(murkupImgWithoutEndingSlash)).toEqual(['images/image.png']);
			});
			test('tag `img` without whitespace before closing', function () {
				expect(extractImagesSrc(murkupImgWithoutWhitespaceBeforeClosing)).toEqual(['images/image.png']);
			});
		});

		describe('find any type of attribute `src` quotes', function () {
			test('(single)', function () {
				expect(extractImagesSrc(markupWithSrcOneQuotted)).toEqual(['images/image.png']);
			});
			test('(double)', function () {
				expect(extractImagesSrc(markupWithSrcDoubleQuotted)).toEqual(['images/image.png']);
			});
			test('(no quotes)', function () {
				expect(extractImagesSrc(markupWithSrcNoQuotes)).toEqual(['images/image.png']);
			});
			test('(multiline)', function () {
				expect(extractImagesSrc(markupWithImagesMultiline)).toEqual(['images/image.png']);
			});
		});

		describe('find', function () {
			test('any tag `img` with any location', function () {
				expect(extractImagesSrc(markupWithSrcOneQuotted)).toEqual(['images/image.png']);
			});
			test('any quantity of tags `img`', function () {
				expect(extractImagesSrc(markupWithThreeImages)).toEqual(['images/image1.png', 'images/image2.png', 'images/image3.png']);
			});
			test('attribute `src` with any position in tag `img`', function () {
				expect(extractImagesSrc(murkupWithSrcAnyPosition)).toEqual(['images/image.png']);
			});
		});

		describe('ignore', function () {
			test('any other attributes `src` except in tag `img`', function () {
				expect(extractImagesSrc(murkupSrcWithoutImgWithSrc)).toEqual([]);
			});
			test('tag `img` with fake `src` (if before `src` there is a symbol without whitespace)', function () {
				expect(extractImagesSrc(murkupWithFakeSrc)).toEqual([]);
			});
			test('tag `img` with `data-src`', function () {
				expect(extractImagesSrc(murkupWithDataSrc)).toEqual([]);
			});
		});

		test('return an array', function () {
			expect(extractImagesSrc(markupWithSrcOneQuotted)).toBeInstanceOf(Array);
		});
	});
});
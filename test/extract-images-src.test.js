import extractImagesSrc from '../src/extract-images-src';

describe('extractImagesSrc', function () {
	describe('expected', function () {
		let markup;

		beforeEach(function () {
			markup = '<div><img src="images/image.png" /></div>';
		});

		test('HTML murkup', function () {
			markup = 'Anything besides html';
			expect(extractImagesSrc(markup)).toEqual([]);
		});
		test('returns an array', function () {
			expect(extractImagesSrc(markup)).toBeInstanceOf(Array);
		});
		test('single quotes type in `src` ', function () {
			markup = "<div><img src='images/image.png'/></div>";
			expect(extractImagesSrc(markup)).toBeTruthy();
		});
		test('double quotes type in `src` ', function () {
			markup = '<div><img src="images/image.png"/></div>';
			expect(extractImagesSrc(markup)).toBeTruthy();
		});
		test('multiline mode supported', function () {
			markup = `
				<div>
					<img src="images/image.png"/>
				</div>
			`;
			expect(extractImagesSrc(markup)).toBeTruthy();
		});
		test('any position of attribute `src`', function () {
			markup = "<div><img class='bg-img' src='images/image.png' width='200'/></div>";
			expect(extractImagesSrc(markup)).toBeTruthy();
		});

		test('any location of tag `img`', function () {
			markup = "<div><p class='img-text'><img src='images/image.png'/></p></div>";
			expect(extractImagesSrc(markup)).toBeTruthy();
		});
	});

	describe('unexpected', function () {
		let markup;

		beforeEach(function () {
			markup = '<div><img src="images/image.png" /></div>';
		});

		test('`img` tag does not include property `src`', function () {
			expect(extractImagesSrc(markup)).toBeTruthy();
		});
	});
});
import { add } from '../src/math';

xdescribe('`math` module', function () {
	describe('can add', function () {
		it('two positive numbers', function () {
			expect(add(2, 8)).toEqual(10);
		});
		it('two negative numbers', function () {
			expect(add(-2, -8)).toEqual(-10);
		});
		it('two positive and negative numbers', function () {
			expect(add(-2, 8)).toEqual(6);
		});
	});
});
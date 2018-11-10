import validatePassword, {
	isMoreThanTenSymbols, isOneUppercase, isOneLowercase, isOneNumber, isOneSpecial, isNoRepeatedMoreThan
} from '../src/validate-password';


xdescribe('password', function () {
	describe('is validated', function () {
		let password = '_Mike2004_';

		test('on correct password', function () {
			expect(validatePassword(password)).toBe(true);
		});
	});
	describe('is invalidated on password with', function () {
		test('at least 10 symbols', function () {
			let password = '_Mike204_';

			expect(() => validatePassword(password)).toThrowError();
		});
		test('at least one uppercase symbol', function () {
			let password = '_mike2004_';

			expect(() => validatePassword(password)).toThrowError();
		});
		test('at least one lowercase symbol', function () {
			let password = '_MIKE2004_';

			expect(() => validatePassword(password)).toThrowError();
		});
		test('at least one number', function () {
			let password = '_MikeMike_';

			expect(() => validatePassword(password)).toThrowError();
		});

		test('at least one special symbol( !@#$%^&*()-_=+{};:,<.>? )', function () {
			let password = '0Mike20040';

			expect(() => validatePassword(password)).toThrowError();
		});
		test('more than allowed symbols in a row: 2', function () {
			let password = '_Mike20004_';

			expect(() => validatePassword(password)).toThrowError();
		});
	});
});
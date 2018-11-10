export function isMoreThanTenSymbols (password) {
	let reg = '.{10}';

	if (password.match(reg)) {
		return true;
	}
	return false;

}

export function isOneUppercase (password) {
	let reg = /[A-Z]/;

	if (password.match(reg)) {
		return true;
	}
	return false;

}

export function isOneLowercase (password) {
	let reg = /[a-z]/;

	if (password.match(reg)) {
		return true;
	}
	return false;

}


export function isOneNumber (password) {
	let reg = /\d/;

	if (password.match(reg)) {
		return true;
	}
	return false;

}

export function isOneSpecial (password, specialSymbols) {
	let reg = new RegExp(`[${specialSymbols}]`);

	if (password.match(reg)) {
		return true;
	}
	return false;

}

export function isNoRepeatedMoreThan (password, times) {
	let regTimes = '';
	let counter = 0;

	while (counter < times) {
		regTimes += '\\1';
		counter++;
	}

	let reg = new RegExp(`(.)${regTimes}`);

	if (!password.match(reg)) {
		return true;
	}
	throw new Error(`There are more than ${times} symbols in a row((((`);

}


export default function validatePassword (password) {
	switch (false) {
		case isMoreThanTenSymbols(password): throw new Error('Password must consist of at least 10 symbols');
		case isOneUppercase(password): throw new Error('There isn`t any uppercase symbol((((');
		case isOneLowercase(password): throw new Error('There isn`t any lowercase symbol((((');
		case isOneNumber(password): throw new Error('There isn`t any number((((');
		case isOneSpecial(password, `!@#$%^&*()-_=+{};:,<.>?`): throw new Error('There isn`t any special symbol( !@#$%^&*()-_=+{};:,<.>? )');
		case isNoRepeatedMoreThan(password, 2): throw new Error('There are more than allowed symbols in a row((((');
		default: return true;
	}
}
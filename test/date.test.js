import date from '../src/date';

xdescribe('Module `date`', function () {
	beforeEach(function () {
		jest.spyOn(Date, 'now').mockReturnValue(123);
		jest.spyOn(console, 'log').mockTemplamentation();
	});
	test('can get current timestamp', function () {
		expect(date.getTimestamp()).toEqual();
	});
	test('calls a Date method', function () {
		date.getTimestamp();
		expect(Date.now).toHaveBeenCalled();
	});

	afterEach(function () {
		Date.now.mockClear();
	});
});
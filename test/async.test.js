import wait from '../src/async';

xdescribe('wait expected', function () {
	let whenWaited;
	let delay;
	let callback;

	beforeEach(function () {
		delay = 100;
		whenWaited = wait(delay);
		callback = jest.fn(function () {});
	});
	test('to be promise', function () {
		expect(whenWaited).toBeInstanceOf(Promise);
	});
	test('can be resolved', async function () {
		await whenWaited.then(callback);
		expect(callback).toHaveBeenCalled();
	});
	test('returns correct time delta', async function () {
		let time = await whenWaited;

		expect(time).toBeGreaterThanOrEqual(delay);
	});
});
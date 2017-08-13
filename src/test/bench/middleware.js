'use strict';

import { Middleware } from '../../middleware';

suite('middleware', () => {
	set('iterations', 10000);

	const middleware = new Middleware;

	middleware.use([
		async (ctx, next) => await next(),
		async (ctx, next) => await next(),
		async (ctx, next) => await next()
	]);

	bench('max calls', (done) => (
		middleware.run({}).then(done, (error) => {
			console.log('Error', error);

			done();
		})
	));

	// const logic = () => Promise.resolve(true);
	//
	// const fn = (ctx, next) => (
	// 	logic().then(next).then(logic)
	// );
	//
	// for (let exp = 0; exp <= 10; exp++) {
	// 	const count = Math.pow(2, exp);
	// 	const arr = [];
	// 	for (let i = 0; i < count; i++) {
	// 		arr.push(fn);
	// 	}
	//
	// 	const stack = compose(arr);
	//
	// 	bench(`(fn * ${count})`, done => {
	// 		stack({}).then(done, done);
	// 	});
	// }
});

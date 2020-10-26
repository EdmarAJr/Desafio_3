const Example = require('../repositories/example');

const hello = async (ctx, next) => {
	ctx.body = { now: 'Hello!' };
	const now = await Example.now();
	console.log(now.rows);
	await next();
};

module.exports = { hello };

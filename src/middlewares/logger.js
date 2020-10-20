const logger = (ctx, next) => {
	console.log(ctx.method, ctx.url);

	next();
};

module.exports = logger;

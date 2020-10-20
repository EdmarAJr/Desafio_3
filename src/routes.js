const Router = require('koa-router');
const Hello = require('./controllers/hello');

const router = new Router();

router.get('/hello', Hello.hello);

router.get('/logger', (ctx) => {
	ctx.body = 'Logger!';
});

module.exports = router;

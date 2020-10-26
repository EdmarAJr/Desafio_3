const Koa = require('koa');
// const Cors = require('@koa/cors'); para integrar com o front
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');
const schema = require('./src/utils/database');

const server = new Koa();

server.use(bodyparser());
server.use(router.routes());
// server.use(Cors()); para integrar com o front

server.listen(8081, () => console.log('Rodando!'));

const Router = require('koa-router');

const router = new Router();

const Auth = require('./controllers/auth');
const Users = require('./controllers/users');
const Jogos = require('./controllers/jogos');
const Classificacao = require('./controllers/classificacao');
const Password = require('./middlewares/encrypt');
const Session = require('./middlewares/sessions');
const classificacao = require('./controllers/classificacao');

router.post('/auth', Auth.autenticar);

router.get('/user', Users.obterUsers);
router.get('/user/:id', Users.obterUser);
router.post('/user', Password.encrypt, Users.adicionarUser);
router.put('/user/:id', Session.verify, Users.atualizarUser);
router.delete('/user/:id', Session.verify, Users.deletarUser);

// router.get('/classificacao', Session.verify, Jogos.obterJogos);
router.get('/classificacao', Session.verify, classificacao.tabelaOrdenadaBrasileirao);
router.get('/jogos/:rodada', Session.verify, Jogos.obterJogo);
router.post('/jogos', Session.verify, Jogos.adicionarJogo);
router.put('/jogos/:id', Session.verify, Jogos.atualizarJogo);
router.delete('/jogos/:id', Session.verify, Jogos.deletarJogo);

module.exports = router;

/**
 * Este arquivo não é utilizado depois de integração com banco de dados.
 */

const user = {
	id: 1,
	email: 'trovador@gmail.com',
	senha: '102030',
	deletado: false,
};

const jogo = {
	id: 1,
	time_casa: 'Grêmio',
	gols_casa: 3,
	gols_visitante: 6,
	time_visitante: 'Santos',
	rodada: 1,
	publicado: true,
	deletado: false,
};

const users = [];
users.push(user);

const jogos = [];
jogos.push(jogo);

module.exports = { users, jogos };

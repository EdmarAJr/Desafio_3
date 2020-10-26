const database = require('../utils/database');

const adicionarJogo = async (jogo) => {
	const {
		time_casa,
		time_visitante,
		gols_casa,
		gols_visitante,
		rodada,
	} = jogo;
	const query = {
		text: `INSERT INTO jogos (
			time_casa, 
			time_visitante, 
			gols_casa, 
			gols_visitante,
			rodada
		) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
		values: [time_casa, time_visitante, gols_casa, gols_visitante, rodada],
	};
	const result = await database.query(query);

	return result.rows.shift();
};

const deletarJogo = async (id, estado) => {
	if (!estado) {
		return null;
	}

	const query = `UPDATE jogos SET deletado = $1 WHERE id = $2 RETURNING *`;
	const result = await database.query({
		text: query,
		values: [estado, id],
	});

	return result.rows.shift();
};

const atualizarJogo = async (jogo) => {
	const {
		time_casa,
		time_visitante,
		gols_casa,
		gols_visitante,
		rodada,
		id,
	} = jogo;
	const query = {
		text: `UPDATE jogos SET time_casa = $1,
		time_visitante = $2,
		gols_casa = $3,
		gols_visitante = $4,
		rodada = $5 WHERE id = $6
		RETURNING *`,
		values: [
			time_casa,
			time_visitante,
			gols_casa,
			gols_visitante,
			rodada,
			id,
		],
	};

	const result = await database.query(query);

	return result.rows.shift();
};

const obterJogo = async (id = null) => {
	if (!id) {
		return null;
	}

	const query = `SELECT * FROM jogos WHERE id = $1`;
	const result = await database.query({
		text: query,
		values: [id],
	});

	return result.rows.shift();
};

const obterJogos = async (deletado = false) => {
	const query = `SELECT * FROM jogos WHERE deletado = $1;`;
	const result = await database.query({
		text: query,
		values: [deletado],
	});

	return result.rows;
};
const obterJogosPorId = async (id = null) => {
	if (!id) {
		return null;
	}

	const query = `SELECT * FROM jogoss WHERE autor = $1 AND deletado = false`;
	const result = await database.query({
		text: query,
		values: [id],
	});

	return result.rows;
};

const obterJogosPublicados = async (publicado = true) => {
	const query = `SELECT * FROM jogos WHERE deletado = false AND publicado = $1`;
	const result = await database.query({
		text: query,
		values: [publicado],
	});

	return result.rows;
};

module.exports = {
	adicionarJogo,
	atualizarJogo,
	obterJogo,
	obterJogos,
	obterJogosPorId,
	obterJogosPublicados,
	deletarJogo,
};

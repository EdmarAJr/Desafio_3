const database = require('../utils/database');

const adicionarUser = async (user) => {
	const { email, senha } = user;
	const query = {
		text: `INSERT INTO users (
			email, 
			senha
		) VALUES ($1, $2) RETURNING *;`,
		values: [email, senha],
	};
	const result = await database.query(query);

	return result.rows.shift();
};

const deletarUser = async (estado) => {
	if (!estado) {
		return null;
	}

	const query = `UPDATE users SET deletado = $1 WHERE id = $2 RETURNING *`;
	const result = await database.query({
		text: query,
		values: [estado],
	});

	return result.rows.shift();
};

const atualizarUser = async (user) => {
	const { email, senha } = user;
	const query = {
		text: `UPDATE Users SET email = $1,
		senha = $2, WHERE id = $3
		RETURNING *`,
		values: [senha, email],
	};

	const result = await database.query(query);

	return result.rows.shift();
};

const obterUser = async (id = null) => {
	if (!id) {
		return null;
	}

	const query = `SELECT * FROM Users WHERE id = $1`;
	const result = await database.query({
		text: query,
		values: [id],
	});

	return result.rows.shift();
};

const obterUserPorEmail = async (email = null) => {
	if (!email) {
		return null;
	}

	const query = `SELECT * FROM users WHERE email = $1 AND deletado = false`;
	const result = await database.query({
		text: query,
		values: [email],
	});

	return result.rows.shift();
};

const obterUsers = async (deletado = false) => {
	const query = `SELECT * FROM users WHERE deletado = $1;`;
	const result = await database.query({
		text: query,
		values: [deletado],
	});

	return result.rows;
};

module.exports = {
	adicionarUser,
	deletarUser,
	atualizarUser,
	obterUser,
	obterUserPorEmail,
	obterUsers,
};

/* eslint-disable no-unused-vars */
const response = require('./response');
const Users = require('../repositories/users');
const Jogos = require('../repositories/jogos');
const Password = require('../utils/password');

const obterUsers = async (ctx) => {
	const result = await Users.obterUsers();
	return response(ctx, 200, result);
};

const obterUser = async (ctx) => {
	const { id = null } = ctx.params;
	if (id) {
		const result = await Users.obterUser(id);
		if (result) {
			return response(ctx, 200, result);
		}
		return response(ctx, 404, { message: 'Usuário não encontrado' });
	}

	return response(ctx, 400, { message: 'Mal formatado' });
};

const adicionarUser = async (ctx) => {
	const { email = null, senha = null } = ctx.request.body;
	const { hash } = ctx.state;
	console.log(ctx.state);
	if (!email || !senha) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	const existencia = await Users.obterUserPorEmail(email);

	if (existencia) {
		return response(ctx, 400, { message: 'Usuário já existente' });
	}

	const user = {
		email,
		senha: hash,
	};

	const result = await Users.adicionarUser(user);
	return response(ctx, 201, result);
};

const atualizarUser = async (ctx) => {
	const { id = null } = ctx.params;
	const { email, senha } = ctx.request.body;

	if (!email && !senha) {
		return response(ctx, 400, 'Pedido mal-formatado');
	}

	if (id) {
		const userAtual = await Users.obterUser(id);
		if (userAtual) {
			const userAtualizado = {
				...userAtual,
				email: email || userAtual.email,
				senha: senha || userAtual.senha,
			};

			const result = await Users.atualizarUser(userAtualizado);
			return response(ctx, 200, result);
		}
		return response(ctx, 404, { message: 'Usuário não encontrado' });
	}
	return response(ctx, 404, { message: 'Usuário não encontrado' });
};

const deletarUser = async (ctx) => {
	const { id = null } = ctx.params;
	const { estado } = ctx.request.body;

	if (typeof estado !== 'boolean') {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	if (id) {
		const userAtual = await Users.obterUser(id);
		const jogosUser = await Jogos.obterJogosDeUser(id);
		if (userAtual) {
			if (estado === true && jogosUser.length > 0) {
				return response(ctx, 403, { message: 'Ação proibida' });
			}

			const result = await Users.deletarUser(id, true);

			return response(ctx, 200, result);
		}
	}

	return response(ctx, 404, { message: 'Usuário não encontrado' });
};

module.exports = {
	obterUsers,
	obterUser,
	adicionarUser,
	atualizarUser,
	deletarUser,
};

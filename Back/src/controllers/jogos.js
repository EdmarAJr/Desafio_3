const response = require('./response');
const Jogos = require('../repositories/jogos');
const { users, jogos } = require('./base');

const obterJogos = async (ctx) => {
	const { id_jogo: idJogo = null, publicado = true } = ctx.query;
	if (idJogo) {
		const idJogos = await Jogos.obterJogosPorId(idJogo);

		if (idJogos.length >= 1) {
			return response(ctx, 200, idJogos);
		}
		return response(ctx, 404, { message: 'Não Encontrado' });
	}
	const estaPublicado = publicado === 'true';
	const publicados = await Jogos.obterJogosPublicados(estaPublicado);
	return response(ctx, 200, publicados);
};

const obterJogo = (ctx) => {
	const { id = null } = ctx.params;
	if (id) {
		const jogoAtual = jogos[id - 1];
		if (jogoAtual) {
			return response(ctx, 200, jogoAtual);
		}

		return response(ctx, 404, { message: 'Jogo não encontrado' });
	}
	return response(ctx, 400, { message: 'Mal formatado' });
};

const adicionarJogo = async (ctx) => {
	const { body } = ctx.request;

	if (
		!body.timeCasa ||
		!body.golsCasa ||
		!body.golsVisitante ||
		!body.timeVisitante ||
		!body.rodada
	) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}
	const Id = jogos.id;
	const existencia = await Jogos.obterJogosPorId(Id);

	if (existencia) {
		return response(ctx, 400, { message: 'Jogo já existente' });
	}
	const jogo = {
		time_casa: body.timeCasa,
		gols_casa: body.golsCasa,
		gols_visitante: body.golsVisitante,
		time_visitante: body.timeVisitante,
		rodada: body.rodada,
	};

	const result = await Jogos.adicionarJogo(jogo);

	return response(ctx, 201, result);
};

const atualizarJogo = async (ctx) => {
	const { id = null } = ctx.params;
	const {
		timeCasa = null,
		golsCasa = null,
		golsVisitante = null,
		timeVisitante = null,
		rodada = null,
		publicado = true,
	} = ctx.request.body;

	if (
		!timeCasa &&
		!golsCasa &&
		!golsVisitante &&
		!timeVisitante &&
		!rodada &&
		!publicado
	) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	if (id) {
		const jogoAtual = await Jogos.obterJogo(id);
		if (jogoAtual) {
			const jogoAtualizado = {
				id: jogoAtual.id,
				timeCasa: timeCasa || jogoAtual.timeCasa,
				golsCasa: golsCasa || jogoAtual.golsCasa,
				golsVisitante: golsVisitante || jogoAtual.golsVisitante,
				timeVisitante: timeVisitante || jogoAtual.timeVisitante,
				rodada: rodada || jogoAtual.rodada,
				publicado: publicado === true,
			};

			const result = await Jogos.atualizarJogo(jogoAtualizado);
			return response(ctx, 200, result);
		}
	}

	return response(ctx, 404, { message: 'Jogo não encontrado' });
};

const deletarJogo = async (ctx) => {
	const { id = null } = ctx.params;
	const { estado } = ctx.request.body;

	if (typeof estado !== 'boolean') {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	if (id) {
		const jogoAtual = await Jogos.obterJogo(id);
		if (jogoAtual) {
			const result = await Jogos.deletarJogo(id, estado);

			return response(ctx, 200, result);
		}
	}

	return response(ctx, 404, { message: 'Jogo não encontrado' });
};

module.exports = {
	obterJogos,
	obterJogo,
	adicionarJogo,
	atualizarJogo,
	deletarJogo,
};

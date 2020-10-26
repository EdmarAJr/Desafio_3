/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
const database = require('./database');

const schema = {
	1: `CREATE TABLE IF NOT EXISTS jogos (
			id SERIAL,
			time_casa VARCHAR(255) NOT NULL,
			time_visitante VARCHAR(255) NOT NULL,
			gols_casa TEXT INT NULL,
			gols_visitante INT NOT NULL,
			rodada INT NOT NULL,
			publicado BOOL DEFAULT TRUE,
			deletado BOOL DEFAULT FALSE
	);`,
	2: `CREATE TABLE IF NOT EXISTS users (
    		id SERIAL,
    		email VARCHAR(255) NOT NULL,
			senha VARCHAR(255) NOT NULL
			deletado BOOL DEFAULT FALSE
	);`,

const drop = async (tableName) => {
	if (tableName) {
		await database.query(`DROP TABLE ${tableName}`);
		console.log('Tabela dropada!');
	}
};

const up = async (number = null) => {
	if (!number) {
		for (const value in schema) {
			await database.query({ text: schema[value] });
		}
	} else {
		await database.query({ text: schema[number] });
	}
	console.log('Migração rodada!');
};

/**
 * Rode up() ou drop("nomeDaTabela");
 */

up();
// drop('jogos');

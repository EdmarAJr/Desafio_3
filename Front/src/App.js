import React from "react";
import { FormularioLogin } from "./rotas/FormularioLogin";
import { TabelaClassificacao } from "./rotas/TabelaClassificacao";
import { TabelaJogos } from "./rotas/TabelaJogos";
//import './api';
import "./estilo.css";

const urlApp = "https://desafio-3-back-cubos-academy.herokuapp.com"; //

//const cors = require("@koa/cors");
//server.use(cors({ origin: "https://localhost:8081/jogos" }));

//const urlApp = "https://localhost:8081/jogos";

//const url = api;

function pegarJogos(rodada) {
  return fetch(`${urlApp}/jogos/${rodada}`)
    .then((res) => res.json())
    .then((dados) => dados.dados);
}

function pegarClassificacao() {
  return fetch(`${urlApp}/classificacao`)
    .then((res) => res.json())
    .then((dados) =>
      dados.dados.map((time) => ({
        ...time,
        saldoDeGols: time.golsFeitos - time.golsSofridos,
      }))
    );
}

function autenticar(email, senha) {
  return fetch(`${urlApp}/auth`, {
    method: "POST",
    body: JSON.stringify({ email, password: senha }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((dados) => dados.dados);
}

function editarJogo(id, golsCasa, golsVisitante, token) {
  return fetch(`${urlApp}/jogos`, {
    method: "POST",
    body: JSON.stringify({ id, golsCasa, golsVisitante }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function App() {
  const [token, setToken] = React.useState();
  const [jogos, setJogos] = React.useState();
  const [rodada, setRodada] = React.useState(1);
  const [classificacao, setClassificacao] = React.useState();

  React.useEffect(() => {
    pegarClassificacao().then(setClassificacao);
  }, []);

  React.useEffect(() => {
    setJogos(undefined);
    pegarJogos(rodada).then(setJogos);
  }, [rodada]);

  return (
    <div className="App">
      <div className="cabecalho">
        <div className="conteudo">
          <h1>Brasileiríssimo</h1>
		  <em>edição 2020</em>

          {token ? (
            <button onClick={() => setToken(false)}>Deslogar</button>
          ) : (
            <FormularioLogin
              onSubmit={({ email, senha }) => {
                autenticar(email, senha).then(
                  ({ token }) => (
                    console.log({ email, senha, token }),
                    token && setToken(token)
                  )
                );
              }}
            />
          )}
        </div>
      </div>

      <div className="colunas">
        <div className="conteudo">
          <TabelaJogos
            jogos={jogos}
            logado={!!token}
            rodada={rodada}
            setRodada={setRodada}
            onEditarJogo={({ id, golsCasa, golsVisitante }) =>
              editarJogo(id, golsCasa, golsVisitante, token).then(() => {
                pegarJogos(rodada).then(setJogos);
                pegarClassificacao().then(setClassificacao);
              })
            }
          />

          <div className="dados">
            <TabelaClassificacao classificacao={classificacao} />
          </div>
        </div>
      </div>
    </div>
  );
}

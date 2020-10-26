import React from "react";
import { TabelaJogos } from "./TabelaJogos";

const colunas = [
  { propriedade: "nome", legenda: "Time" },
  { propriedade: "pontos", legenda: "Pontos", abreviacao: "PTS" },
  { propriedade: "empates", legenda: "Empates", abreviacao: "E" },
  { propriedade: "vitorias", legenda: "Vitórias", abreviacao: "V" },
  { propriedade: "derrotas", legenda: "Derrotas", abreviacao: "D" },
  { propriedade: "golsFeitos", legenda: "Gols Feitos", abreviacao: "GF" },
  { propriedade: "golsSofridos", legenda: "Gols Sofridos", abreviacao: "GS" },
  { propriedade: "saldoDeGols", legenda: "Saldo de Gols", abreviacao: "SG" },
];

export function TabelaClassificacao({ classificacao }) {
  const [colunaOrdenada, setColunaOrdenada] = React.useState();
  const [ordem, setOrdem] = React.useState("ascendente");

  if (!classificacao) {
    return <div>Carregando...</div>;
  }

  const tabelaAscendente = colunaOrdenada
    ? [...classificacao].sort((t1, t2) => {
        if (
          typeof t1[colunaOrdenada.propriedade] === "number" &&
          typeof t2[colunaOrdenada.propriedade] === "number"
        ) {
          return (
            t1[colunaOrdenada.propriedade] - t2[colunaOrdenada.propriedade]
          );
        } else {
          return t1[colunaOrdenada.propriedade].localeCompare(
            t2[colunaOrdenada.propriedade]
          );
        }
      })
    : classificacao;

  const tabelaOrdenada =
    ordem === "ascendente" ? tabelaAscendente : [...tabelaAscendente].reverse();

  return (
    <table className="classificacao">
      <thead>
        <tr>
          <th>
            Posição
            <button
              className="icon"
              onClick={() => {
                if (!colunaOrdenada) {
                  setOrdem((ordem) =>
                    ordem === "descendente" ? "ascendente" : "descendente"
                  );
                } else {
                  setColunaOrdenada(undefined);
                  setOrdem("descendente");
                }
              }}
            >
              {colunaOrdenada ? (
                <img
                  src="https://systemuicons.com/images/icons/sort.svg"
                  alt="Ordenar"
                />
              ) : ordem === "descendente" ? (
                <img
                  src="https://systemuicons.com/images/icons/arrow_up.svg"
                  alt="Ordenar descendente"
                />
              ) : (
                <img
                  src="https://systemuicons.com/images/icons/arrow_down.svg"
                  alt="Ordenar ascendente"
                />
              )}
            </button>
          </th>
          {colunas.map((coluna) => (
            <th>
              {coluna.abreviacao ? (
                <abbr title={coluna.legenda}>
                  {coluna.abreviacao || coluna.legenda}
                </abbr>
              ) : (
                coluna.legenda
              )}{" "}
              <button
                className="icon"
                onClick={() => {
                  if (colunaOrdenada === coluna) {
                    setOrdem((ordem) =>
                      ordem === "descendente" ? "ascendente" : "descendente"
                    );
                  } else {
                    setColunaOrdenada(coluna);
                    setOrdem("descendente");
                  }
                }}
              >
                {!colunaOrdenada ||
                colunaOrdenada.propriedade !== coluna.propriedade ? (
                  <img
                    src="https://systemuicons.com/images/icons/sort.svg"
                    alt="Ordenar"
                  />
                ) : ordem === "descendente" ? (
                  <img
                    src="https://systemuicons.com/images/icons/arrow_up.svg"
                    alt="Ordenar descendente"
                  />
                ) : (
                  <img
                    src="https://systemuicons.com/images/icons/arrow_down.svg"
                    alt="Ordenar ascendente"
                  />
                )}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tabelaOrdenada.map((time, i) => (
          <tr>
            <td>{classificacao.indexOf(time) + 1}</td>
            {colunas.map((coluna) => (
              <td>{time[coluna.propriedade]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

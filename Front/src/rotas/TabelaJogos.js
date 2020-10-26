import React from "react";

export function TabelaJogos({
  jogos,
  logado,
  rodada,
  setRodada,
  onEditarJogo,
}) {
  const [linhaEmEdicao, setLinhaEmEdicao] = React.useState(null);
  const [golsCasa, setGolsCasa] = React.useState();
  const [golsConvidado, setGolsConvidado] = React.useState();

  React.useEffect(() => {
    setLinhaEmEdicao(null);
    setGolsCasa(undefined);
    setGolsConvidado(undefined);
  }, [logado]);

  return (
    <div className="jogos">
      <div className="rodada">
        <button disabled={rodada === 1} onClick={() => setRodada((r) => r - 1)}>
          <img
            src="https://systemuicons.com/images/icons/arrow_left.svg"
            alt="Anterior"
            title="Anterior"
          />
        </button>
        <h2>{rodada}ª rodada</h2>
        <button
          disabled={rodada === 38}
          onClick={() => setRodada((r) => r + 1)}
        >
          <img
            src="https://systemuicons.com/images/icons/arrow_right.svg"
            alt="Próxima"
            title="Próxima"
          />
        </button>
      </div>
      <div className="tabela">
        {jogos ? (
          <table>
            <tbody>
              {jogos
                .filter((jogo) => jogo.rodada === rodada)
                .map((jogo, i) => (
                  <tr>
                    <td className="nome-casa">{jogo.time_casa}</td>
                    <td className="gols">
                      {linhaEmEdicao !== i ? (
                        jogo.gols_casa
                      ) : (
                        <input
                          value={golsCasa}
                          onChange={(event) => setGolsCasa(event.target.value)}
                        />
                      )}
                    </td>
                    <td>&times;</td>
                    <td className="gols">
                      {linhaEmEdicao !== i ? (
                        jogo.gols_visitante
                      ) : (
                        <input
                          value={golsConvidado}
                          onChange={(event) =>
                            setGolsConvidado(event.target.value)
                          }
                        />
                      )}
                    </td>
                    <td className="nome-convidado">{jogo.time_visitante}</td>
                    <td
                      style={{
                        visibility: logado ? "" : "hidden",
                      }}
                    >
                      {linhaEmEdicao === i ? (
                        <button
                          type="button"
                          onClick={(event) => {
                            onEditarJogo({
                              id: jogo.id,
                              golsCasa: golsCasa,
                              golsVisitante: golsConvidado,
                            });

                            setLinhaEmEdicao(null);
                            setGolsCasa(undefined);
                            setGolsConvidado(undefined);
                          }}
                        >
                          <img
                            src="https://systemuicons.com/images/icons/check.svg"
                            title="Salvar"
                            alt="Salvar"
                          />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(event) => {
                            setLinhaEmEdicao(i);
                            setGolsCasa(jogo.gols_casa);
                            setGolsConvidado(jogo.gols_visitante);
                          }}
                        >
                          <img
                            src="https://systemuicons.com/images/icons/pen.svg"
                            title="Editar placar do jogo"
                            alt="Editar placar do jogo"
                          />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: "1em" }}>Carregando...</div>
        )}
      </div>
    </div>
  );
}

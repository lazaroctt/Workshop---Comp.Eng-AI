/**
 * Matriz de confusão como mapa de calor. Cada linha é a classe verdadeira
 * e cada coluna, a classe que o modelo previu. A diagonal guarda os acertos.
 */

/** Azul institucional para os acertos, vinho para as confusões. */
const cor = (acerto, intensidade) => {
  const base = acerto ? '29, 66, 118' : '138, 61, 74';
  const alfa = (acerto ? 0.1 : 0.08) + intensidade * (acerto ? 0.72 : 0.5);
  return `rgba(${base}, ${alfa.toFixed(3)})`;
};

export default function MatrizConfusao({ classes, matriz }) {
  const maior = Math.max(...matriz.flat(), 1);
  const totais = matriz.map((linha) => linha.reduce((s, v) => s + v, 0));

  return (
    <>
      <div className="tabela-wrap">
        <table className="matriz">
          <thead>
            <tr>
              <th scope="col" className="matriz-canto">
                <span>real</span>
                <span>previsto</span>
              </th>
              {classes.map((classe) => (
                <th key={classe} scope="col">{classe}</th>
              ))}
              <th scope="col" className="matriz-total">total</th>
            </tr>
          </thead>
          <tbody>
            {matriz.map((linha, i) => (
              <tr key={classes[i]}>
                <th scope="row">{classes[i]}</th>
                {linha.map((valor, j) => {
                  const acerto = i === j;
                  const intensidade = valor / maior;
                  return (
                    <td
                      // A posição identifica a célula, que pode repetir valores.
                      key={`${classes[i]}-${classes[j]}`}
                      className={acerto ? 'celula acerto' : 'celula erro'}
                      style={{
                        background: cor(acerto, intensidade),
                        color: intensidade > 0.55 ? '#ffffff' : undefined,
                      }}
                      title={acerto
                        ? `${valor} exemplos de ${classes[i]} foram classificados corretamente`
                        : `${valor} exemplos de ${classes[i]} foram previstos como ${classes[j]}`}
                    >
                      {valor}
                    </td>
                  );
                })}
                <td className="matriz-total">{totais[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="legenda">
        Leia por linha: dos exemplos que eram de uma classe, quantos o modelo colocou em cada
        coluna. Os números em azul, na diagonal, são os acertos. Tudo em vermelho ficou fora do
        lugar, e a coluna em que o número aparece mostra com qual classe o modelo se confundiu.
      </p>
    </>
  );
}

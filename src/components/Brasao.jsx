import { useState } from 'react';

/**
 * Brasão oficial da Universidade Federal Fluminense.
 *
 * COMO INSERIR O ARQUIVO OFICIAL
 * Salve o brasão em: public/assets/brasao-uff.png
 * O endereço público correspondente é /assets/brasao-uff.png, já apontado
 * pela constante abaixo. Para usar outro formato ou outro nome, basta trocar
 * o valor de CAMINHO_BRASAO.
 *
 * Recomendações de arquivo: PNG com fundo transparente e pelo menos 240 px de
 * altura, ou SVG. A altura de exibição é controlada pelo CSS, então o arquivo
 * pode vir em resolução maior sem prejuízo.
 *
 * Enquanto o arquivo não estiver na pasta, o componente mostra uma moldura
 * neutra indicando o espaço reservado. Nenhum símbolo é desenhado no lugar do
 * brasão oficial.
 */
export const CAMINHO_BRASAO = `${import.meta.env.BASE_URL}assets/brasao-uff.png`;

export default function Brasao({ altura = 54, className = 'marca-uff' }) {
  const [ausente, setAusente] = useState(false);

  if (ausente) {
    return (
      <span
        className="brasao-reservado"
        style={{ height: altura, width: altura * 0.82 }}
        title="Insira o brasão oficial em public/assets/brasao-uff.png"
        aria-label="Espaço reservado ao brasão da UFF"
      >
        <span>brasão<br />UFF</span>
      </span>
    );
  }

  return (
    <img
      src={CAMINHO_BRASAO}
      alt="Brasão da Universidade Federal Fluminense"
      className={className}
      style={{ height: altura }}
      onError={() => setAusente(true)}
    />
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Triagem() {
  const navigate = useNavigate();
  const [respostas, setRespostas] = useState({
    peso: '', // Adicionando o peso ao estado
    tatuagem_piercing: null,
    infeccoes_sexuais: null,
    procedimento_endoscopico: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // **** A FUNÇÃO QUE ESTAVA FALTANDO ESTÁ AQUI ****
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      // Converte a string 'true'/'false' dos radios para boolean
      setRespostas(prev => ({ ...prev, [name]: value === 'true' }));
    } else {
      // Para outros campos como o de peso
      setRespostas(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Lógica de validação (adaptada para os novos nomes de estado)
    if (!respostas.peso || respostas.tatuagem_piercing === null || respostas.infeccoes_sexuais === null || respostas.procedimento_endoscopico === null) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }
    if (respostas.peso < 50) {
      setError('Inapto: O peso mínimo para doação é de 50 kg.');
      setLoading(false);
      return;
    }
    if (respostas.tatuagem_piercing || respostas.infeccoes_sexuais || respostas.procedimento_endoscopico) {
      setError('Inapto: Você possui um impedimento temporário para a doação.');
      setLoading(false);
      return;
    }

    alert('Você está apto para a próxima etapa!');
    navigate('/agendar-doacao');
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="cartao-triagem">
        <h1 className="titulo-triagem">Questionário de Triagem</h1>
        <p className="subtitulo-triagem">Por favor, responda com sinceridade:</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Campo de Peso adicionado aqui para consistência */}
          <div className="secao-triagem">
            <div className="grupo-pergunta">
              <p className="pergunta">Qual seu peso atual (kg)?</p>
              <input
                type="number" name="peso"
                className="campo-entrada"
                placeholder="Ex: 75"
                value={respostas.peso}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="secao-triagem">
            <h2 className="secao-titulo">Nos últimos 6 meses você:</h2>

            <div className="grupo-pergunta">
              <p className="pergunta">Fez tatuagem ou colocou piercing/brinco?</p>
              <div className="opcoes-radio">
                <label className="opcao-radio">
                  <input type="radio" name="tatuagem_piercing" value="true" checked={respostas.tatuagem_piercing === true} onChange={handleChange} required />
                  <span>Sim</span>
                </label>
                <label className="opcao-radio">
                  <input type="radio" name="tatuagem_piercing" value="false" checked={respostas.tatuagem_piercing === false} onChange={handleChange} />
                  <span>Não</span>
                </label>
              </div>
            </div>

            <div className="grupo-pergunta">
              <p className="pergunta">Se expôs a infecções sexualmente transmissíveis?</p>
              <div className="opcoes-radio">
                <label className="opcao-radio">
                  <input type="radio" name="infeccoes_sexuais" value="true" checked={respostas.infeccoes_sexuais === true} onChange={handleChange} required />
                  <span>Sim</span>
                </label>
                <label className="opcao-radio">
                  <input type="radio" name="infeccoes_sexuais" value="false" checked={respostas.infeccoes_sexuais === false} onChange={handleChange} />
                  <span>Não</span>
                </label>
              </div>
            </div>

            <div className="grupo-pergunta">
              <p className="pergunta">Fez algum procedimento endoscópico?</p>
              <div className="opcoes-radio">
                <label className="opcao-radio">
                  <input type="radio" name="procedimento_endoscopico" value="true" checked={respostas.procedimento_endoscopico === true} onChange={handleChange} required />
                  <span>Sim</span>
                </label>
                <label className="opcao-radio">
                  <input type="radio" name="procedimento_endoscopico" value="false" checked={respostas.procedimento_endoscopico === false} onChange={handleChange} />
                  <span>Não</span>
                </label>
              </div>
            </div>
          </div>
          
          <button type="submit" className="botao-entrar" disabled={loading}>
            {loading ? 'Verificando...' : 'Verificar Aptidão'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Triagem;
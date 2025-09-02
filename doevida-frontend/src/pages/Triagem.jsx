import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import '../styles/triagem.css';


function Triagem() {
  const [peso, setPeso] = useState('');
  const [respostas, setRespostas] = useState({
    tatuagem: null,
    ist: null,
    endoscopia: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setRespostas(prev => ({ ...prev, [name]: value === 'sim' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validação dos dados
    if (peso === '' || respostas.tatuagem === null || respostas.ist === null || respostas.endoscopia === null) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Aplicação das Regras de Negócio
    if (peso < 50) {
      setError('Inapto: O peso mínimo para doação é de 50 kg.');
      return;
    }
    if (respostas.tatuagem || respostas.ist || respostas.endoscopia) {
      setError('Inapto: Você possui um impedimento temporário para a doação. Agradecemos seu interesse!');
      return;
    }

    // Se passou por todas as validações, o usuário está apto!
    alert('Você está apto para a próxima etapa!');
    navigate('/agendar-doacao'); // Redireciona para o agendamento
  };

  return (
    <main className="container-login">
      <form onSubmit={handleSubmit} className="cartao-login">
        <h1 className="titulo-login">Triagem Rápida</h1>
        {error && <p className="error-message">{error}</p>}

        <div className="grupo-entrada">
          <label htmlFor="peso">Seu peso atual (kg)</label>
          <input
            id="peso" type="number"
            className="campo-entrada-triagem"
            value={peso} onChange={(e) => setPeso(e.target.value)}
          />
        </div>

        <div className="grupo-questoes">
          <p className="subtitulo-questoes">Nos últimos 6 meses você:</p>
          
          <div className="questao">
            <label>Fez tatuagem ou colocou piercing/brinco?</label>
            <div>
              <input type="radio" id="tatuagem-sim" name="tatuagem" value="sim" onChange={handleRadioChange} />
              <label htmlFor="tatuagem-sim">Sim</label>
              <input type="radio" id="tatuagem-nao" name="tatuagem" value="nao" onChange={handleRadioChange} />
              <label htmlFor="tatuagem-nao">Não</label>
            </div>
          </div>

          <div className="questao">
            <label>Se expôs a infecções sexualmente transmissíveis?</label>
            <div>
              <input type="radio" id="ist-sim" name="ist" value="sim" onChange={handleRadioChange} />
              <label htmlFor="ist-sim">Sim</label>
              <input type="radio" id="ist-nao" name="ist" value="nao" onChange={handleRadioChange} />
              <label htmlFor="ist-nao">Não</label>
            </div>
          </div>

          <div className="questao">
            <label>Fez algum procedimento endoscópico?</label>
            <div>
              <input type="radio" id="endoscopia-sim" name="endoscopia" value="sim" onChange={handleRadioChange} />
              <label htmlFor="endoscopia-sim">Sim</label>
              <input type="radio" id="endoscopia-nao" name="endoscopia" value="nao" onChange={handleRadioChange} />
              <label htmlFor="endoscopia-nao">Não</label>
            </div>
          </div>
        </div>

        <button type="submit" className="botao-entrar">Verificar aptidão</button>
      </form>
    </main>
  );
}
export default Triagem;
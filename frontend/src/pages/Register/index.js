import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api'
import './styles.css';

import logo from '../../assets/logo.svg';
export default function Register() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    async function handleRegister(e) {
        e.preventDefault();
        const objOng = {
            name,
            email,
            whatsapp,
            city,
            state,
        };

        try {
            const response = await api.post('ongs', objOng);
            alert(`Sua id para acesso é: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert('Erro ao efeturar o cadastro, tente novamente');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="bth" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />Voltar
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input
                        placeholder="E-mail" type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} />
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} />
                        <input
                            placeholder="UF"
                            value={state}
                            onChange={e => setState(e.target.value)}
                            style={{ width: 80 }} />
                    </div>
                    <button className="button" type="submit">Cadastrar </button>
                </form>
            </div>
        </div>
    );
}
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import { FiLogIn } from 'react-icons/fi'
import api from '../../services/api'
import logo from '../../assets/logo.svg';
import heroPng from '../../assets/heroes.png';

export default function Logon() {
    const history = useHistory();
    const [id, setId] = useState('');

    function handleLogin(e) {
        e.preventDefault();
        try {
            api.post('sessions', { id }).then(r => {
                alert(`Olá ${r.data.name}`);
                localStorage.setItem('ongId', id);
                localStorage.setItem('ongName', r.data.name);
                history.push('/profile');
            });
        } catch (error) {
            alert('Erro ao autenticar!\n' + error);
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="bth" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />Quero me cadastrar!
                    </Link>
                </form>
            </section>
            <img src={heroPng} alt="hero" />
        </div>);
}

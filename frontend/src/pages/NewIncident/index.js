import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logo from '../../assets/logo.svg';
import { useState } from 'react';
import api from '../../services/api';
export default function NewIncident() {
    const history = useHistory();
    const [title, setTittle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');

    function handleCreateIncident(e) {
        e.preventDefault();
        const data = { title, description, value };
        api.post('incidents', data, {
            headers: {
                authorization: ongId
            }
        }).then(r => {
            alert('Incidente cadastrado!');
            history.push('/profile');
        }, e => {
            alert('Erro ao cadastrar incidente');
        });
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="bth" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />Voltar
                    </Link>
                </section>
                <form onSubmit={handleCreateIncident}>
                    <input placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTittle(e.target.value)}
                    />
                    <textarea placeholder="Descrição do caso"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar </button>
                </form>
            </div>
        </div>
    );
}
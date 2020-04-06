import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default function Profile() {
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    useEffect(() => {
        api.get('profile', {
            headers: {
                authorization: ongId
            }
        }).then(ret => {
            setIncidents(ret.data);
        });
    }, [ongId]);

    function handleDeleteIncident(id) {
        api.delete(`incidents/${id}`, {
            headers: {
                authorization: ongId
            }
        }).then(r => {
            alert('Caso removido!');
            setIncidents(incidents.filter(i => i.id !== id));
        }, err => {
            debugger
            alert('Erro ao remover caso')
        })
    }

    function handleLogout() {
        localStorage.removeItem('ongId');
        localStorage.removeItem('ongName');
        history.push('/');
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="bth" />
                <span>Benvindo(a) {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button
                    onClick={handleLogout}
                    type="button">   <FiPower size={18} color="#E02041" /> </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button
                            onClick={() => handleDeleteIncident(incident.id)}
                            type="button"><FiTrash2 size={20} color="#a8a8b3" /></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
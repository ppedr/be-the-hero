import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Profile () {

    const history = useHistory ('');
    const [incidents, setIncidents] = useState ([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    

    useEffect(() => {
        
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident (id) {

        try {

            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            
            setIncidents(incidents.filter( incident => incident.id !== id ));
            
        } catch (error) {
            
            alert ('Incident delete error, try again.');
        }

    }

    function handleLogout() {

        localStorage.clear();
        history.push('/');

    }

    return (
        <duv className = "profile-container">
            <header>
                <img src = { logoImg } alt = "Be The Hero" />
                <span>Welcome, { ongName }</span>

                <Link className = "button" to = "/incidents/new">Register new incident</Link>
                <button type = "button">
                    <FiPower onClick = { handleLogout } size = { 18 } color = "#E02041" />
                </button>
            </header>

            <h1>Registered incidents</h1>

            <ul>
                { incidents.map(incident => (
                    <li key = { incident.id }>
                        <strong>INCIDENT:</strong>
                        <p>{ incident.title }</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{ incident.description }</p>

                        <strong>VALUE:</strong>
                        <p>{ Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format( incident.value ) }</p>

                        <button onClick  = { () => handleDeleteIncident( incident.id ) }  type = "button">
                            <FiTrash2 size = { 20 } color = "#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </duv>
    );
}
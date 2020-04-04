import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';

export default function Logon() {

    const [id, setID] = useState ('');
    const history = useHistory ('');

    async function handleLogin(e) {

        e.preventDefault();

        try {
            
            const response = await api.post('sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');

        } 
        catch (err) {
            
            alert ('Login failed, try again.');

        }

    }

    return (

        <div className = "logon-container">
            <section className = "form">
                <img src = { logoImg } alt = "Be The Hero"/>
                <form onSubmit = { handleLogin }>  
                    <h1>Sign in</h1>

                    <input 
                        placeholder = "Your ID" 
                        value = { id }
                        onChange = { e => setID(e.target.value) }
                    />

                    <button className = "button" type = "submit">Submit</button>

                    <Link className = "back-link" to = "/register">
                        <FiLogIn size = { 16 } color = "#E02041"/>
                        I don't have a registration
                    </Link>
                </form>
            </section>
            <img src= { heroesImg } alt = "Heroes"/>
        </div>

    );
}
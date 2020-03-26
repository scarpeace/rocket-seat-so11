import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import "./styles.css";
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg'

export default function Login() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      
      const response = await api.post('sessions', { id });
      // Seta a uma valor na memória do navegador
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name)
        history.push('/profile')
    } catch (err) {
      console.log(err)
      alert('Falha no Login, tente novamente')
    }
  }

  return (
    <div>
      <div className="logon-container">
        <section className="form">
          <img src={logo} alt="Be the Hero" />

          <form onSubmit={handleLogin}>
            <h1>Faça seu login</h1>

            <input placeholder="Sua ID" onChange={e => { setId(e.target.value) }} />
            <button className="button" type="submit">Login</button>

            <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#E02041" />
                Não tenho cadastro
            </Link>

          </form>
        </section>

        <img src={heroesImg} alt="Heroes" />
      </div>
    </div>
  )
}

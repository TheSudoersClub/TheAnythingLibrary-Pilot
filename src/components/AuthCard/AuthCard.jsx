import React from 'react'
import { auth, provider } from '../../config/firebaseAuth';
import { signInWithPopup } from 'firebase/auth';
import './AuthCard.css'

const AuthCard = (props) => {
  
  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      props.setAuthenticated(true)
      localStorage.setItem('authenticated', true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='authCard'>
      <div className="authCard__message">
        <h1>The Anything Library<br/>(Pilot)</h1>
      </div>
      <div className="authCard__authBtn">
        <button onClick={signIn}>Continue With Google</button>
      </div>
    </div>
  )
}

export default AuthCard;
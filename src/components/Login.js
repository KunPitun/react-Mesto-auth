import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import * as auth from '../auth.js';

function Login(props) {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth.authorize(email, password)
      .then((data) => {
        if(data.token) {
          localStorage.setItem('currentUserEmail', email);
          setEmail('');
          setPassword('');
          props.isLoggedIn();
          history.push("/");
        }
      })
      .catch(err => console.log(err));
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  /*позволил себе добавить блок "Еще не зарегистрированы? Зарегистриоваться" , хоть это и не по брифу
  если это критично - уберу*/
  return (
    <div className="login-register">
      <h2 className="login-register__title">Вход</h2>
      <form onSubmit={handleSubmit} className="login-register__form" name="login-form" noValidate>
        <input onChange={handleChangeEmail} value={email}
          className="login-register__input login-register__input_type_email" type="email"
          placeholder="Email" name="form-input-email" id="email-input" required />
        <span className="login-register__error login-register-input-error"></span>
        <input onChange={handleChangePassword} value={password}
          className="login-register__input login-register__input_type_password" type="text"
          placeholder="Пароль" name="form-input-password" id="passsword-input" minLength="8"
          maxLength="30" required />
        <span className="login-register__error login-register-input-error"></span>
        <button className="login-register__submit-btn"
          type="submit">Войти</button>
      </form>
      <div className="login-register__singup-singin">
        <p className="login-register__text">Ещё не зарегистрированы?</p>
        <Link to="/sign-up" className="login-register__link"> Зарегистрироваться</Link>
      </div>
    </div>
  );
}

export default withRouter(Login);
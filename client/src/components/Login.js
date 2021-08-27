import React, { useState } from 'react';
import { auth } from '../firebase';
import { Link, useHistory } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push('/');
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.logo}>Task Tracker</h1>
      <div className={styles.title}>
        <h2>Welcome back to Task Tracker.</h2>
        <p>
          New here?
          <Link to="/signup" className={styles.link}>
            Create an account.
          </Link>
        </p>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.input}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.inputbox}
            name="email"
            type="email"
            // placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.input}>
          <label className={styles.label}>Password</label>
          <input
            className={styles.inputbox}
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.btn}>Login</button>

        {/* <div>
          Sign up <Link to="/signup">here</Link>
        </div> */}
      </form>
    </div>
  );
};

export default Login;

import React, { useState, useContext } from 'react';
import { AccountContext } from './account';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authenticate } = useContext(AccountContext);

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data: any) => {
        console.log('Logged In!', data);
      })
      .catch((err: any) => console.error('error', err));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="border-black border-4"
        />
        <label htmlFor="password" className="block">
          Password
        </label>
        <input
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="border-black border-4"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

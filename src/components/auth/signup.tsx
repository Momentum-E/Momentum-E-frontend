import React, { useState } from 'react';
import userPool from '../user-pool/user-pool';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [username, setUsername] = useState('');

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    userPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
    });
  };

  return (
    <div className="block">
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
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;

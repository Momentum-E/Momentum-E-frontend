import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from './account';

const Status = () => {
  const [status, setStatus] = useState<boolean>(false);
  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session: any) => {
      console.log('Session', session);
      setStatus(true);
    });
  }, [getSession]);

  return (
    <div>
      {status ? <button onClick={logout}>Logout</button> : null}
    </div>
  );
};

export default Status;

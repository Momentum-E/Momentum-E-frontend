import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from '../../context/account';
import Link from 'next/link';

interface Status_props{
  classname:string,
  href:(URL|string),
}

const Status = ({classname,href}:Status_props) => {
  const [status, setStatus] = useState<boolean>(false);
  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession().then((session: any) => {
      console.log('Session', session);
      setStatus(true);
    });
  }, [getSession]);

  return (
    <>
      {status ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <Link className={classname} href={href}>
          <button>Login</button>
        </Link>
      )}
    </>
  );
};

export default Status;

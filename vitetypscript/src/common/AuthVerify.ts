import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AuthVerifyProps {
  logOut: () => void;
}

const parseJwt = (token: string): { exp: number } | null => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify: React.FC<AuthVerifyProps> = ({ logOut }) => {
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      const parsedUser = JSON.parse(user);
      const decodedJwt = parseJwt(parsedUser.accessToken);

      if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  }, [location, logOut]);

  return null;
};

export default AuthVerify;




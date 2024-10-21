import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

interface AuthState {
  isLoading: boolean;
  isAuth: boolean;
}

// ----------------------------------------------------------------------

export default function AuthGuard({ children }: AuthGuardProps) {
  return <Container>{children}</Container>
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state: { auth: AuthState }) => state.auth);

  const check = useCallback(() => {
    if (!isAuth) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = '/sign-in';
      const href = `${loginPath}?${searchParams}`;

      navigate(href)
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};

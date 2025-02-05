import React from 'react';

import { useKeycloak } from '@react-keycloak/web';
import { Navigate, useLocation } from 'react-router-dom';

const Login: React.FC = () => {
    const { initialized, keycloak } = useKeycloak();

    const location = useLocation();

    if (!initialized) {
        return <>Loading</>;
    }

    if (keycloak.authenticated) {
        return (
            <Navigate
                to={{ pathname: '/example', search: location.search }}
                state={{ from: location }}
            />
        );
    } else {
        keycloak.login();
        return <>Loading</>;
    }
};

export default Login;

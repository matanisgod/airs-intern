import React from 'react';

import { ReactKeycloakProvider } from '@react-keycloak/web';
import dotenv from 'dotenv';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import { keycloak } from './keycloak';
import Routes from './routes';

import reportWebVitals from '@/utils/reportWebVitals';

const mainElement = document.createElement('div');
mainElement.id = 'root';
document.body.appendChild(mainElement);

const root = ReactDOM.createRoot(mainElement);

dotenv.config();

root.render(
    <ReactKeycloakProvider
        authClient={keycloak}
        onEvent={(ev) => console.log('onEvent', ev)}
        onTokens={(token) => console.log('onToken', token)}
    >
        <React.StrictMode>
            <RecoilRoot>
                <Routes />
            </RecoilRoot>
        </React.StrictMode>
    </ReactKeycloakProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

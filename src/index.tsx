import React from 'react';
import dotenv from 'dotenv';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import Routes from './routes';

import reportWebVitals from '@/utils/reportWebVitals';

const mainElement = document.createElement('div');
mainElement.id = 'root';
document.body.appendChild(mainElement);

const root = ReactDOM.createRoot(mainElement);

dotenv.config();

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (ex: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

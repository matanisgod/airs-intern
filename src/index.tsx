import React from 'react';

import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider, CssBaseline, createTheme } from '@mui/material';
import dotenv from 'dotenv';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { RecoilHooks } from './recoil/hooks';
import AppRoutes from './routes';
import { themeSelector } from './theme';
import { initPro, reportWebVitals } from './utils';

const darkTheme = createTheme(themeSelector());
const mainElement = document.createElement('div');
mainElement.id = 'root';
document.body.appendChild(mainElement);

initPro();
const root = ReactDOM.createRoot(mainElement);

dotenv.config();

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilHooks>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ThemeProvider>
        </StyledEngineProvider>
      </RecoilHooks>
    </RecoilRoot>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (ex: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

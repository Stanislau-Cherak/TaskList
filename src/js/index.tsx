import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/store';

import App from './components/App/App';

import '../scss/reset.scss';

const app = ReactDOM.createRoot(document.getElementById('App') as HTMLElement);

app.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
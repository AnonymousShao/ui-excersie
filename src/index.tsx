import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import Coins from './pages/Coins';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Coins
      title={'Oracle'}
    />
  </React.StrictMode>
);

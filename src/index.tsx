import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import App from './pages/app';
import { store } from './redux/store';
import './shared/assets/css/base.scss';
import { GameService } from './shared/services/game-service/game-service';
import { socketIO } from './shared/services/socket';
import * as serviceWorker from './shared/serviceWorker';

export const gameService = new GameService(socketIO);
gameService.init();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

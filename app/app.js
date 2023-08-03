import './i18n';
import React, { useContext } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import createReducer from './redux/reducers';
import rootSaga from './redux/rootSaga';
import { NotifMessage } from 'Components';
import { LocaleContext } from 'Contexts';
import { Landing } from './containers/pageListAsync';

const sagaMiddleware = createSagaMiddleware();
const reducer = createReducer();
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});

sagaMiddleware.run(rootSaga);

function App() {
  const { LOCALE } = useContext(LocaleContext);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={LOCALE + '/'} element={<Landing />} />
        </Routes>
      </BrowserRouter>
      <NotifMessage />
    </Provider>
  );
}

export default App;

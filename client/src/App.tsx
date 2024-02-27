import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import SideBar from './layouts/sidebar/sidebar';
import MainRoutes from './Routes';
import { Provider } from 'react-redux';
import { store} from './store/store';
const App = ()=> {
  return (
    <div className="flex h-screen">
      <Provider store={store}>
        <SideBar/>
        <MainRoutes/>
      </Provider>
     
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
// import Add_MenuList from './Menulist_byOwner/Add_MenuList';
import ClientPage from './Client/ClientPage'
import OwnerPage from './Owner/OwnerPage';

// 1.
// ReactDOM.render(<App />, document.getElementById('root'));

// 2.
ReactDOM.render(
  <React.StrictMode>
    {/* <Add_MenuList /> */}
    <ClientPage /> 
    <OwnerPage />
  </React.StrictMode>,
  document.getElementById('root')
);


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Add_MenuList />
// );
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import MouseTracker from '../components/commons/mouseTracker';

const Layout = () => {
  return (
    <>
      <MouseTracker text='💌'>
        <Header />
        <Outlet />
      </MouseTracker>
    </>
  );
};

export default Layout;

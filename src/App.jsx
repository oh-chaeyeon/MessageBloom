import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Main from './pages/main';
import PostId from './pages/post-id';
import List from './pages/list-page';
import PostIdMessage from './pages/post-id-message-page';
import Post from './pages/post-page';
import Layout from './layouts/Layout';
import NotFound from './pages/not-found';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='post' element={<Post />} />
        <Route path='list' element={<List />} />
        <Route path='post/:id'>
          <Route index element={<PostId />} />
          <Route path='message' element={<PostIdMessage />} />
        </Route>
      </Route>
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
}

export default App;

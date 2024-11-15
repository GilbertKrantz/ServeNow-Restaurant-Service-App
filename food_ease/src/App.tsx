import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddMenu from './views/admin/add_menu';
import Menu from './views/menu/Menu';
import Chatbot from './views/ai_chatbot/Chatbot';
import MenuDetail from './views/menu/components/menu_detail/MenuDetail';


function App() {
  return (
    <>
      <Routes>
        <Route path='*' element={<Menu />} />
        <Route path='/add-menu' element={<AddMenu />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/menu-detail' element={<MenuDetail />} />
        {/* <Route path='/cart' element={<Cart />} /> */}
      </Routes>
    </>
  );
}

export default App;

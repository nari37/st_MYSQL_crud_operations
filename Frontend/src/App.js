import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './Create';
import Read from './Read';
import Edit from './Update';

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/' element = {<Home/>}/>
      <Route path = '/create' element = {<Create/>}/>
      <Route path = '/Read/:id' element = {<Read/>}/>
      <Route path='/edit/:id' element = {<Edit/>}/>
      {/* <Route path='/delete/:id' element={<Home/>}/> */}


    </Routes>
    </BrowserRouter>
  )
}




import { useState,useEffect } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import About  from './components/About.jsx'
import NoteState from './context/notes/NoteState.jsx';
import Alert from './components/alert.jsx';



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div><Navbar/><Alert/><div className="container"><Home/></div></div>,
    },
    {
      path: "/about",
      element: <div><Navbar/><div className="container"><About/></div></div>,
    },
    // {
    //   path: "/navbar",
    //   element: <div><Navbar/></div>,
    // },
  ]);
  

  return (
    <>
      <NoteState>
        
        <RouterProvider router={router} />
        
      </NoteState>
    </>
  )
}

export default App

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
import Alert from './components/Alert.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div><Navbar/><Alert alert={alert}/><div className="container"><Home showAlert={showAlert}/></div></div>,
    },
    {
      path: "/about",
      element: <div><Navbar /><Alert alert={alert}/><div className="container"><About showAlert={showAlert}/></div></div>,
    },
    {
      path: "/login",
      element: <div><Navbar /><Alert alert={alert}/><div className="container"><Login showAlert={showAlert}/></div></div>,
    },
    {
      path: "/signup",
      element: <div><Navbar /><Alert alert={alert}/><div className="container"><Signup showAlert={showAlert}/></div></div>,
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

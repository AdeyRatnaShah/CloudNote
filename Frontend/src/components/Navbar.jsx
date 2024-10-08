import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect } from 'react'
import { NavLink,  useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();
  useEffect(() => {
  }, [location]);
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to='/'>iNoteBook</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={`nav-link light ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to='/' >Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} aria-current="page" to='/about' >About</NavLink>
            </li>
          </ul>
          {!localStorage.getItem('token') ? <form className="d-flex" role="search">
            <NavLink className="btn btn-primary mx-1" to="/login" role="button">Login</NavLink>
            <NavLink className="btn btn-primary mx-1" to="/signup" role="button">Signup</NavLink>

          </form>:<button onClick={handleLogout} className="btn btn-primary">Log Out</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

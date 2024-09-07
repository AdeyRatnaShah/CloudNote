import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    let navigate =useNavigate();
    const handleSubmit = async (e) => {
        const {name, email, password} = credentials;
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email,password })
            });
            const json = await response.json();

            console.log(json);
            if (json.success) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken);
                navigate("/");  // Updated to use navigate
                props.showAlert("Account created", "success")
            } else {
                props.showAlert("Invalid details","danger")
            }
        } catch (error) {
            console.error("Login failed:", error);
            
        }
    };

    return (
        <div className='container  mt-3'>
            <h2>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}> 

  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name="email" className="form-control"  onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password"  onChange={onChange} className="form-control"  name="password" id="password" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" name="cpassword" onChange={onChange}  className="form-control" id="cpassword" minLength={5} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default Signup
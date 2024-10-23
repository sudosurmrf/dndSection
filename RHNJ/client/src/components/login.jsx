 /* TODO - add your code to create a functional React component that renders a login form */
/* import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 

const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login`;

async function fetchLogin(User, setThisUser, setToken, setError){
  try{
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: User.email,
          password: User.password,
        }),
      });
      

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        return;
      }

     const {user, token} = await response.json();
    setThisUser(user);
    setToken(token);
    setError(null);
    localStorage.setItem('token', token);
  }
  catch(error){
    setError("An error occurred during login. Please try again.");
    console.error("Login error: ", error);
  }
}

function Login({setToken}){
    const [thisUser, setThisUser] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
            e.preventDefault();
            const User = {
              email: email,
              password: password,
            }
            fetchLogin(User, setThisUser, setToken, setError);

          }

    return(
      <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form onSubmit={handleSubmit} id="form">
            <Form.Group controlId="loginemail">
                <Form.Label>User email:</Form.Label>
             <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
          />
            </Form.Group>
            <br/>

            <Form.Group controlId="user-password">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
          />
      </Form.Group>
      <br/>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    {thisUser && (
        <div>
          <h3>Welcome, {thisUser.firstname}!</h3> 
        </div>
      )}


    </div>
  );
}

export default Login; */
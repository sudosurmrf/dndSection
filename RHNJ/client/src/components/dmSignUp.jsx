/* import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 

const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register`;

function Register({token, setToken}){
      
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [personId, setPersonId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch(API_URL, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                firstname,
                lastname,
                email,
                password
              })
            });
            if (!response.ok) {
              const errorData = await response.json();
              setError(errorData.message || 'Registration failed');
              return;
          }

          const result = await response.json();
          if (result.token) {
            setToken(result.token); 
            localStorage.setItem('token', result.token); 
          }

          setPersonId(result.id); 
          setError(null); 
          setFirstname('');
          setLastname('');
          setEmail('');
          setPassword('');
          
          console.log('Registered person ID:', result.id);

      } catch (error) {
          setError("Registration error: " + error.message); 
          console.error("Registration error: ", error); 
      }
  };


        return (
          <div>
            <h2>Register</h2>
            <p>{token} {token ? token : "No token available"}</p>
            {error && <p style={{ color: 'red' }}>{error}</p>} 
            {personId && <p>Registered successfully with ID: {personId}</p>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)} 
                  required
                />
              </Form.Group>
              <br />
        
              <Form.Group controlId="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)} 
                  required
                />
              </Form.Group>
              <br />
        
              <Form.Group controlId="registeremail">
                <Form.Label>User email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
              </Form.Group>
              <br />
        
              <Form.Group controlId="user-password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
              </Form.Group>
              <br />
        
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            </div>
            
          );
        }




export default Register */
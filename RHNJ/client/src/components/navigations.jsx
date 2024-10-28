// client/src/components/navigations.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigations = () => {
  return (
    <nav>
      <div className='nav-left1'>
        <ul>
          <li>
            <Link to='/' className='navtext'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/about' className='navtext'>
              About
            </Link>
          </li>
          <li>
            <Link to='/how-to-play' className='navtext'>
              How To Play
            </Link>
          </li>
          <li>
            <Link to='/characters' className='navtext'>
              Characters
            </Link>
          </li>
        </ul>
      </div>
      <div className='nav-right'>
        <ul>
          <li>
            <Link to='/login' className='navtext2'>
              Login
            </Link>
          </li>
          <li>
            <Link to='/signup' className='navtext2'>
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigations;

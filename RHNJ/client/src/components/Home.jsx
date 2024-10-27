/* the components need to be named with capitol letters to be recognized as components.  */
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Home() {
  return (
    <nav>
      <div className='nav-left'>
        <ul>
          <li>
            <Link to='/about' className='navtext'>
              About
            </Link>
          </li>
          <li>
            <Link to='/how-to-play' className='navtext'>
              How to Play
            </Link>
          </li>
          <li>
            <Link to='/about-characters' className='navtext'>
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
}
{
  /* <li>
          <Link to='/admin-home'>Admin Home</Link>
        </li>
        <li>
          <Link to='/dm-home'>DM Home</Link>
        </li>
        <li>
          <Link to='/player-home'>Player Home</Link>
        </li> */
}

export default Home;

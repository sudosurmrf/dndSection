/* the components need to be named with capitol letters to be recognized as components.  */
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Home() {
  return (
    <div>
      <nav>
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Signup</Link>
        </li>
        <li>
          <Link to='/about-characters'>About Characters</Link>
        </li>
        <li>
          <Link to='/admin-home'>Admin Home</Link>
        </li>
        <li>
          <Link to='/dm-home'>DM Home</Link>
        </li>
        <li>
          <Link to='/player-home'>Player Home</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
}

export default Home;
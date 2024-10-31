import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navigations from './Navigations';

export default function About() {
  return (
    <div className='about-us'>
      <Navigations />
      <h1 className='about-h1'>About Us</h1>
      <h2 className='about-h2'>The Game</h2>
      <p className='abt-p'>Dungeons and Divas was created ..........</p>
      <h2 className='about-h2'>The Creators</h2>
      <h3 className='about-h3'>Jessica Lafferty</h3>
      <p className='abt-p'>Dungeons and divas was created ..........</p>
      <h3 className='about-h3'>Katherine Arambulo</h3>
      <p className='abt-p'>text here......</p>
    </div>
  );
}

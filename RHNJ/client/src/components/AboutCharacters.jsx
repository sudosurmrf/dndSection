// client/src/pages/aboutCharacters.jsx
import React from 'react';
import characters from '../utils/characterList';
import '../index.css';

export default function AboutCharacter({ setSelectedCharacterID, character }) {
  return (
    <div
      className='about-character'
      onClick={() => setSelectedCharacterID(character.id)}
    >
      <img src={character.image} alt={`${character.class} image`} />
      <div>{character.class}</div>
      <div>{character.description}</div>
    </div>
  );
}

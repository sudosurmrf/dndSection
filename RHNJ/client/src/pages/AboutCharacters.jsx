// client/src/pages/aboutCharacters.jsx
import React from 'react';

export default function aboutCharacter({ setSelectedCharacterID, character }) {
    return (
      <tr onClick={() => setSelectedCharacterID(character.id)}>
        <td>{character.image}</td>
        <td>{character.class}</td>
        <td>{character.description}</td>
      </tr>
    );
  }
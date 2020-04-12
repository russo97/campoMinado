import React from 'react';

import './Tile.css';

function Tile ({ children, leftClick, rightClick }) {
  return (
    <div
      className="tile"
      onClick={ e => leftClick(e) }
      onContextMenu={ e => rightClick(e) }>
        { children  }
    </div>
  );
}

export default Tile;
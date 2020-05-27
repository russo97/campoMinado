import React from 'react';

import './Tile.css';

function Tile ({ children, leftClick, rightClick, covered }) {
  return (
    <div
      className="tile"
      onClick={ e => leftClick(e) }
      onContextMenu={ e => rightClick(e) }>
        { covered ? '' : children  }
    </div>
  );
}

export default Tile;
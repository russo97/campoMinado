import React from 'react';

import './Tile.css';

function Tile ({ children, leftClick, rightClick, covered, xIndex, yIndex }) {
  return (
    <div
      className="tile"
      onClick={ event => leftClick({ yIndex, xIndex, event } ) }
      onContextMenu={ event => rightClick({ xIndex, yIndex, event } ) }>
        { covered ? '' : children  }
    </div>
  );
}

export default Tile;
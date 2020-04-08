import React, { useState, useEffect } from 'react';

function App () {
  const gridSize = [8, 12, 15];
  const [level, setLevel] = useState(0);
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    setVirginTiles();
  }, [level]);

  useEffect(() => {
    setVirginTiles();
  }, []); // happens once time when its loaded

  function setVirginTiles () {
    let currentGridSize = gridSize[level];

    let placeholderTiles = Array.from({ length: currentGridSize ** 2 }, (_, index) => {
      return ({ index });
    });

    setTiles(placeholderTiles);

    setMutualCSSProperties(
      document.querySelector('#gameContainer > .box'),
      [
        { propName: '--shape', propValue: currentGridSize },
        { propName: 'font-size', propValue: `${29 - currentGridSize}px` },
        { propName: 'line-height', propValue: `${[50, 33, 26][level]}px` }
      ]
    );
  }

  function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function setMutualCSSProperties (element, props) {
    for (let index = 0, len = props.length; index < len; index++) {
      let current = props[index];

      element.style.setProperty(current.propName, current.propValue);
    }
  }

  return (
    <div id="container">
      <div id="gameContainer">
        <div className="box">
          {
            tiles.map(e => <div key={e.index}> { random(1, 8) } </div>)
          }
        </div>
      </div>

      <div id="menuContainer">
        <div className="gameInfo">
          <div className="qntBombsFounded">Encontradas</div>
          <div className="timePast">Tempo usufruído</div>
        </div>

        <div className="gameControls">
          <div className="gameControlButton">Play</div>
          <div className="gameControlButton">Melhores Tempos</div>
          <div className="gameControlButton" onClick={e => setLevel(level + 1 > gridSize.length - 1 ? 0 : level + 1)}>Alterar Dificuldade</div>
        </div>
      </div>
    </div>
  );
}

export default App;
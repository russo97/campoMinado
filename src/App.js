import React, { useState, useEffect } from 'react';

import Tile from './components/Tile';

function App () {
  const gridSize = [8, 12, 15];
  const [level, setLevel] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setVirginTiles();
  }, [level]);

  useEffect(() => {
    setVirginTiles();
  }, []); // happens once time when its loaded

  function setVirginTiles () {
    let currentGridSize = gridSize[level];

    let placeholderTiles = Array.from({ length: currentGridSize ** 2 }, (_, index) => {
      return ({
        index,
        bombCount: 0
      });
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

  function playGame () {
    setPlaying(!playing);
  }

  function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function setMutualCSSProperties (element, props) {
    for (let index = 0, len = props.length; index < len; index++) {
      let { propName, propValue } = props[index];

      element.style.setProperty(propName, propValue);
    }
  }

  function changeDifficult () {
    let nextLevel = level + 1;

    let switchLevel = nextLevel > gridSize.length - 1
      ? 0
      : nextLevel;

    setLevel(switchLevel);
  }

  function tileReceivedLeftClick (e) {
    e.preventDefault();

    console.log('botão esquedo clicou');
  }

  function tileReceivedRightClick (e) {
    e.preventDefault();

    console.log('botão direito clicou');
  }

  return (
    <div id="container">
      <div id="gameContainer">
        <div className="box">
          {
            tiles.map((eachTile) => {
              let { index, bombCount } = eachTile;

              return (
                <Tile key={index}
                      leftClick={tileReceivedLeftClick}
                      rightClick={tileReceivedRightClick}> { bombCount } </Tile>
              );
            })
          }
        </div>
      </div>

      <div id="menuContainer">
        <div className="gameInfo">
          <div className="qntBombsFounded">Encontradas</div>
          <div className="timePast">Tempo usufruído</div>
        </div>

        <div className="gameControls">
          <div className="gameControlButton" onClick={() => playGame()}> { playing ? 'Restart Game' : 'Play' } </div>
          <div className="gameControlButton">Melhores Tempos</div>
          <div className="gameControlButton" onClick={e => changeDifficult()}>Alterar Dificuldade</div>
        </div>
      </div>
    </div>
  );
}

export default App;
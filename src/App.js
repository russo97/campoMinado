import React, { useState, useEffect } from 'react';

import Tile from './components/Tile';

import random from './utils/random';

function App () {
  const gridSize = [8, 12, 15];
  const [level, setLevel] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [bombsCount, setBombsCount] = useState(gridSize[level]);

  useEffect(() => {
    setVirginTiles();
  }, [level]);

  useEffect(() => {
    setVirginTiles();
  }, []); // happens once time when its loaded

  function setVirginTiles () {
    let currentGridSize = gridSize[level], arraySize = { length: currentGridSize }, bCount = Math.floor((currentGridSize ** 2) * .40);

    let placeholderTiles = Array.from(arraySize, (_, yIndex) =>
      Array.from(arraySize, (__, xIndex) => ({
          bombsCount: 0,
          covered: true,
          isABomb: false,
          xIndex, yIndex,
          index: yIndex * currentGridSize + xIndex
        })
      )
    );
    
    while (bCount > howManyBombsExists(placeholderTiles)) {
      let x = random(0, currentGridSize - 1);
      let y = random(0, currentGridSize - 1);

      let tile = placeholderTiles[y][x];

      if (!tile.isABomb) tile.isABomb = true;
    }

    console.log(placeholderTiles);
    
    setBombsCount(bCount);
    setTiles(placeholderTiles);
    
    playing && setPlaying(false);

    setMutualCSSProperties(
      document.querySelector('#gameContainer > .box'),
      [
        { propName: '--shape', propValue: currentGridSize },
        { propName: 'font-size', propValue: `${29 - currentGridSize}px` },
        { propName: 'line-height', propValue: `${[50, 33, 26][level]}px` }
      ]
    );
  }

  function howManyBombsExists (tileSet) {
    return tileSet.reduce((acc, cur, i) => acc + cur.filter(tile => tile.isABomb).length, 0);
  }

  function playGame () {
    setPlaying(!playing);
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
    let { event, xIndex, yIndex } = e;

    event.preventDefault();

    console.log(`x: ${xIndex} y: ${yIndex}`);
  }

  function tileReceivedRightClick (e) {
    let { event, xIndex, yIndex } = e;

    event.preventDefault();

    console.log(`x: ${xIndex} y: ${yIndex}`);
  }

  return (
    <div id="container">
      <div id="gameContainer">
        <div className="box">
          {
            tiles.map((row) =>
              row.map(cell => {
                let { index, covered, xIndex, yIndex } = cell;

                return (
                  <Tile key={index}
                        xIndex={xIndex}
                        yIndex={yIndex}
                        covered={covered}
                        leftClick={tileReceivedLeftClick}
                        rightClick={tileReceivedRightClick}> { index } </Tile>
                );
              })
            )
          }
        </div>
      </div>

      <div id="menuContainer">
        <div className="gameInfo">
          <div className="qntBombsFounded">
            Encontradas
            <br/>
            { `0 de ${bombsCount}` }
          </div>
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
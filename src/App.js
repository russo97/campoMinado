import React, { useState, useEffect } from 'react';

function App () {
  const baseGrid = [10, 15, 20];
  const [tiles, setTiles] = useState([]);
  const [difficult, setDifficult] = useState(0);

  useEffect(() => {
    document.querySelector('#gameContainer > .box').style.setProperty('--shape', baseGrid[difficult]);
  }, [difficult]);

  return (
    <div id="container">
      <div id="gameContainer">
        <div className="box">
          {
            [...new Array(baseGrid[difficult] ** 2)].map(e => <div></div>)
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
          <div className="gameControlButton" onClick={e => setDifficult(difficult + 1 > baseGrid.length - 1 ? 0 : difficult + 1)}>Alterar Dificuldade</div>
        </div>
      </div>
    </div>
  );
}

export default App;
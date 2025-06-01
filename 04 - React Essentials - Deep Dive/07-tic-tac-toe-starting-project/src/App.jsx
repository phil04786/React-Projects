import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}
function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      // winner = firstSquareSymbol;
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  // const [players, setPlayers] = useState({
  //   X: "Player 1",
  //   O: "Player 2",
  // });
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X"); //initial active player and then change  that

  // let currentPlayer = "X";

  // if (gameTurns.length > 0 && gameTurns[0].player === "X") {
  //   currentPlayer = "O";
  // }

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);

  // let gameBoard = [...initialGameBoard.map((array) => [...array])];

  // for (const turn of gameTurns) {
  //   const { square, player } = turn;
  //   const { row, col } = square;

  //   gameBoard[row][col] = player;
  // }

  // let winner;

  // for (const combination of WINNING_COMBINATIONS) {
  //   const firstSquareSymbol =
  //     gameBoard[combination[0].row][combination[0].column];
  //   const secondSquareSymbol =
  //     gameBoard[combination[1].row][combination[1].column];
  //   const thirdSquareSymbol =
  //     gameBoard[combination[2].row][combination[2].column];

  //   if (
  //     firstSquareSymbol &&
  //     firstSquareSymbol === secondSquareSymbol &&
  //     firstSquareSymbol === thirdSquareSymbol
  //   ) {
  //     // winner = firstSquareSymbol;
  //     winner = players[firstSquareSymbol];
  //   }
  // }

  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    //New Turns Array depends on the old turns array.[new turns infront of the old turns].First item in the array is always the latest turn.
    // How should the information about a single turn in our game should  look like?

    setGameTurns((prevTurns) => {
      // let currentPlayer = "X";

      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //   currentPlayer = "O";
      // }

      const currentPlayer = deriveActivePlayer(prevTurns);

      //X is selected at 1,1
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          // activePlayerSymbol={activePlayer}
          // turns={gameTurns}
          board={gameBoard}
        />
      </div>
      <Logs turns={gameTurns} />
    </main>
  );
}

export default App;

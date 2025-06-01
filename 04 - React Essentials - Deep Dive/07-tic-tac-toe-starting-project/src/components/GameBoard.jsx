// const initialGameBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];
{
  /*
<ol>
  <li>
    <ol>
      <li></li>
      <li></li>
      <li></li>
    </ol>
  </li>

  <li>
    <ol>
      <li></li>
      <li></li>
      <li></li>
    </ol>
  </li>

  <li>
    <ol>
      <li></li>
      <li></li>
      <li></li>
    </ol>
  </li>
</ol>;
*/
}
export default function GameBoard({
  onSelectSquare /*, activePlayerSymbol*/,
  /*turns*/
  board,
}) {
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   function handleSelectSquare(rowIndex, colIndex) {
  //     //prevGameBoard :- old array elements of initialGameBoard[] (filled with innerArray)
  //     setGameBoard((prevGameBoard) => {
  //       const updatedBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ];
  //       updatedBoard[rowIndex][colIndex] = "activePlayerSymbol";
  //       return updatedBoard;
  //     });

  //     onSelectSquare();
  //   }

  //Deriving State
  // let gameBoard = initialGameBoard;

  // for (const turn of turns) {
  //   const { square, player } = turn;
  //   const { row, col } = square;

  //   gameBoard[row][col] = player;
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button> */}
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

import Square from './Square';
import { calculateWinner } from '../utils/calculateWinner';

function Board({ xIsNext, squares, onPlay, winningLine }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Переможець: ${winner.player}`;
  } else if (squares.every(square => square)) {
    status = 'Нічия!';
  } else {
    status = `Наступний гравець: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="text-center">
      <div className="text-2xl font-semibold mb-4 text-indigo-700">{status}</div>
      <div className="grid grid-cols-3 gap-2 bg-gray-200 p-4 rounded-xl shadow-lg">
        {squares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onSquareClick={() => handleClick(i)}
            isWinning={winningLine && winningLine.includes(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
import { useState, useEffect } from 'react';
import Board from './Board';
import { calculateWinner } from '../utils/calculateWinner';

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [stats, setStats] = useState({ X: 0, O: 0, draws: 0 });
  const [firstPlayerIsX, setFirstPlayerIsX] = useState(Math.random() < 0.5); // Випадково визначаємо першого гравця

  // Визначаємо, чи ходить "X", враховуючи першого гравця
  const xIsNext = firstPlayerIsX ? currentMove % 2 === 0 : currentMove % 2 !== 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);

  useEffect(() => {
    const savedStats = localStorage.getItem('ticTacToeStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  useEffect(() => {
    if (winner) {
      const newStats = { ...stats, [winner.player]: stats[winner.player] + 1 };
      setStats(newStats);
      localStorage.setItem('ticTacToeStats', JSON.stringify(newStats));
    } else if (currentSquares.every(square => square) && !winner) {
      const newStats = { ...stats, draws: stats.draws + 1 };
      setStats(newStats);
      localStorage.setItem('ticTacToeStats', JSON.stringify(newStats));
    }
  }, [currentSquares]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setFirstPlayerIsX(Math.random() < 0.5); // Випадково обираємо першого гравця при новій грі
  }

  const moves = history.map((squares, move) => {
    const desc = move ? `Перейти до ходу #${move}` : 'Початок гри';
    return (
      <li key={move}>
        <button
          className="text-indigo-600 hover:underline"
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-800">Хрестики-нулики</h1>
      <Board
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
        winningLine={winner ? winner.line : null}
      />
      <button
        className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        onClick={resetGame}
      >
        Нова гра
      </button>
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-indigo-700">Статистика</h2>
        <p>Перемоги X: {stats.X}</p>
        <p>Перемоги O: {stats.O}</p>
        <p>Нічиї: {stats.draws}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-indigo-700">Історія ходів</h2>
        <ol className="list-decimal pl-6">{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
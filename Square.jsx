function Square({ value, onSquareClick, isWinning }) {
    return (
      <button
        className={`w-20 h-20 text-4xl font-bold rounded-lg shadow-md transition-all duration-300 
          ${isWinning ? 'bg-green-400 text-white scale-110' : 'bg-white hover:bg-gray-100 text-gray-800'}
          flex items-center justify-center border-2 border-gray-300`}
        onClick={onSquareClick}
      >
        {value}
      </button>
    );
  }
  
  export default Square;
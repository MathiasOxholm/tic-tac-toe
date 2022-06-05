import React from "react";
import { useState, useEffect } from "react";
import Cell from "../components/Cell";

const Game = () => {
  // Create a Tic Tac Toe game
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState();
  const [isDraw, setIsDraw] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isWinner, setIsWinner] = useState(false);
  const [isLoser, setIsLoser] = useState(false);
  const [winnerCols, setWinnerCols] = useState([]);

  // Handle the click of a cell
  const handleClick = (index) => {
    if (isGameOver) {
      return;
    }
    if (board[index] !== null) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
    checkDraw(newBoard);
  };

  // Handle the reset of the game
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner();
    setIsDraw(false);
    setIsGameOver(false);
    setIsWinner(false);
    setWinnerCols([]);
  };

  // Check if there is a winner
  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setIsGameOver(true);
        setIsWinner(true);
        setWinnerCols([lines[i]]);
      }
    }
  };

  // Check if there is a draw
  const checkDraw = (board) => {
    if (board.every((cell) => cell !== null)) {
      setIsDraw(true);
      setIsGameOver(true);
    }
  };

  // Handle the click of the reset button
  const handleResetButton = () => {
    handleReset();
  };

  // Check if winnerCols contains the index of the cell
  const checkWinnerCols = (index) => {
    return winnerCols.some((col) => col.includes(index));
  };

  // Foreach board as cell if the cell is a winner
  const renderCell = (cell, index) => {};

  useEffect(() => {
    console.log(winnerCols);
    if (winnerCols) {
    }
  }, [winnerCols]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 bg-gray-900">
      <div className="flex flex-col items-center justify-center">
        {isWinner && isGameOver && !isDraw ? (
          <h2 className="text-5xl text-white">Winner: {winner}</h2>
        ) : (
          <h2 className="text-5xl text-white">
            Player {isXNext ? "X" : "O"}
            {"'"}s turn
          </h2>
        )}
        {isDraw && !isWinner && <h2 className="text-5xl text-white">Draw</h2>}
      </div>
      <div className="board container mx-auto grid w-full max-w-2xl grid-cols-3 grid-rows-3 gap-4 rounded-3xl bg-gray-800 p-6 shadow-lg">
        {board.map((cell, index) => (
          <Cell
            key={index}
            winnerCols={winnerCols}
            index={index}
            handleClick={handleClick}
            cell={cell}
            isGameOver={isGameOver}
          />
        ))}
      </div>
      <div className="container flex h-20 w-full max-w-3xl items-center justify-center">
        {isLoser && <h1>Loser</h1>}

        {isGameOver && (
          <button
            className="leading-0 flex h-full select-none items-center rounded-full bg-pink-600 px-16 border-2 border-pink-600 font-bold uppercase tracking-wider text-gray-900 transition duration-200 hover:bg-transparent hover:text-pink-400"
            onClick={handleResetButton}
          >
            Reset game
          </button>
        )}
      </div>

      {isError && <h1>{errorMessage}</h1>}
    </div>
  );
};

export default Game;

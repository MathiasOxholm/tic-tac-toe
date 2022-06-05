import { useEffect, useState } from "react";

const Cell = ({ cell, index, winnerCols, handleClick, isGameOver }) => {
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    winnerCols.length > 0
      ? winnerCols.map((col) => {
          col.includes(index) ? setIsWinner(true) : setIsWinner(false);
        })
      : setIsWinner(false);
  }, [index, winnerCols]);

  const winnerStyles = "bg-green-400 border-green-500";
  const normalStyles = "bg-gray-900 ";
  const normalHover = "cursor-pointer hover:border-gray-700";
  const OStyles = "border-pink-700 bg-pink-600";
  const XStyles = "border-sky-500 bg-sky-400";

  const baseStyles =
    "cell flex aspect-square items-center justify-center rounded-3xl border-4 border-gray-900 transition-all duration-300";

  return (
    <div
      className={[
        baseStyles,
        index,
        !isGameOver && normalHover,
        !cell && normalStyles,
        cell === "X" && !isWinner && XStyles,
        cell === "O" && !isWinner && OStyles,
        isWinner && winnerStyles,
      ].join(" ")}
      onClick={() => handleClick(index)}
    >
      <div
        className={[
          "transition-all duration-300",
          !cell && "scale-0",
          cell === "X" && !isWinner && "scale-100",
          isWinner && "scale-125",
        ].join(" ")}
      >
        {cell === "X" && (
          <div className="relative">
            <span className="absolute flex h-2 w-24 origin-center -translate-x-2/4 rotate-45 bg-white"></span>
            <span className="absolute flex h-2 w-24 origin-center -translate-x-2/4 -rotate-45 bg-white"></span>
          </div>
        )}
        {cell === "O" && (
          <div className="aspect-square h-24 rounded-full border-8 border-white"></div>
        )}
      </div>
    </div>
  );
};

export default Cell;

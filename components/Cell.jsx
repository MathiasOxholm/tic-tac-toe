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
  const normalStyles = "bg-gray-900 border-gray-900";
  const normalHover = "cursor-pointer hover:border-gray-700";
  const OStyles = "border-pink-800 bg-pink-600 hover:border-pink-800";
  const XStyles = "border-sky-500 bg-sky-400 hover:border-sky-500";

  const baseStyles =
    "cell flex aspect-square items-center justify-center rounded-xl md:rounded-3xl border-4 transition-all duration-300";

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
        isGameOver && !isWinner && "opacity-30",
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
            <span className="absolute flex h-3 w-14 origin-center -translate-y-2/4 -translate-x-2/4 rotate-45 bg-white md:h-5 md:w-28"></span>
            <span className="absolute flex h-3 w-14 origin-center -translate-y-2/4 -translate-x-2/4 -rotate-45 bg-white md:h-5 md:w-28"></span>
          </div>
        )}
        {cell === "O" && (
          <div className="aspect-square h-14 rounded-full border-12 border-white md:h-28 md:border-20"></div>
        )}
      </div>
    </div>
  );
};

export default Cell;

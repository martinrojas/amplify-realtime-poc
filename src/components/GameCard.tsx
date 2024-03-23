import React from "react";
import { Game } from "../API";

interface GameCardProps extends Game {
  date?: string;
}

const GameCard: React.FC<GameCardProps> = ({
  Team1Name,
  Team2Name,
  Team1Score,
  Team2Score,
  date,
}) => {
  return (
    <>
      <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title"> {Team1Name}</div>
          <div className="stat-value"> {Team1Score}</div>
        </div>
        <div className="stat place-items-center text-secondary">
          <div className="stat-title"> VS</div>
          <div className="stat-value">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          {!!date && <div className="stat-desc">Date: {date}</div>}
        </div>
        <div className="stat place-items-center">
          <div className="stat-title"> {Team2Name}</div>
          <div className="stat-value"> {Team2Score}</div>
        </div>
      </div>
    </>
  );
};

export default GameCard;

import React from "react";
import { Game } from "../API";
import { useFetchGames } from "../hooks/dataHooks/useGame";
import GameCard from "./GameCard";

// const client = generateClient();

const SeeScore: React.FC = () => {
  const games = useFetchGames();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 md:p-6">
      {games.map((game: Game, index) => (
        <GameCard key={index} {...game} />
      ))}
    </section>
  );
};

export default SeeScore;

import React from "react";
import GamepadIcon from "./Icons/GamepadIcon";
import { createNewGames } from "../hooks/dataHooks/useGame";
import ActivityIcon from "./Icons/ActivityIcon";
import { generateClient } from "aws-amplify/api";
import { updateGame } from "../graphql/mutations";
import { listGames } from "../graphql/queries";
import { Game } from "../API";

const client = generateClient();

const scoreGenerator = (currentScore: number) => {
  let score = currentScore + Math.floor(Math.random() * 10);
  if (score > 99) {
    score = Math.floor(Math.random() * 10);
  }
  return score;
};

const CreateGame: React.FC = () => {
  const onCreateGame = async () => {
    const newGame = await createNewGames(4);
    console.log("Create Game", newGame);
  };

  const onUpdateGame = async () => {
    const { data } = await client.graphql({ query: listGames });
    const allGames: Game[] = data?.listGames?.items;
    console.log("All games", allGames);
    allGames?.forEach(async (game) => {
      const updatedGame = await client.graphql({
        query: updateGame,
        variables: {
          input: {
            id: game?.id,
            Team1Score: scoreGenerator(game?.Team1Score || 1),
            Team2Score: scoreGenerator(game?.Team2Score || 1),
          },
        },
      });
      console.log("Update Game", updatedGame);
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Create Game Section  */}
          <section className=" col-span-2 mx-auto bg-white rounded-lg shadow-md overflow-hidden ">
            <div className="flex items-center justify-between px-6 py-4">
              <h2 className="text-2xl font-bold text-gray-800 ">
                Game Score Generator
              </h2>
              <GamepadIcon className="w-8 h-8 text-gray-800 " />
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-600 ">
                Generate 4 random football game scores by clicking the button
                below.
              </p>
            </div>
            <div className="px-6 py-4">
              <button
                className="w-full h-12 text-white bg-blue-600 hover:bg-blue-500 rounded-md"
                onClick={onCreateGame}
              >
                Generate New Game
              </button>
            </div>
          </section>
          {/* Update Scores  */}
          <section className=" col-span-2 mx-auto bg-white rounded-lg shadow-md overflow-hidden ">
            <div className="flex items-center justify-between px-6 py-4">
              <h2 className="text-2xl font-bold text-gray-800 ">
                Random Game Scores Updates
              </h2>
              <ActivityIcon className="w-8 h-8 text-gray-800 " />
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-600 ">
                Update random points up to 10 more from the current game scores
                by clicking the button below. Resets at 99.
              </p>
            </div>
            <div className="px-6 py-4">
              <button
                className="w-full h-12 text-white bg-blue-600 hover:bg-blue-500 rounded-md"
                onClick={onUpdateGame}
              >
                Update Scores
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CreateGame;

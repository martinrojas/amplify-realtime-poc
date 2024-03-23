import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import { Game } from "../../API";
import { createGame } from "../../graphql/mutations";
import { listGames } from "../../graphql/queries";
import * as subscriptions from "../../graphql/subscriptions";

const client = generateClient();

const createRandomGame = () => {
  const teams = [
    "Manchester United",
    "Chelsea",
    "Arsenal",
    "Manchester City",
    "Liverpool",
    "Tottenham",
    "Leicester City",
    "West Ham United",
    "Everton",
    "Aston Villa",
    "Crystal Palace",
    "Wolverhampton Wanderers",
    "Southampton",
    "Newcastle United",
    "Brighton & Hove Albion",
    "Burnley",
    "Fulham",
    "West Bromwich Albion",
    "Sheffield United",
  ];
  const randomTeam1 = teams[Math.floor(Math.random() * teams.length)];
  let randomTeam2 = teams[Math.floor(Math.random() * teams.length)];
  while (randomTeam1 === randomTeam2) {
    randomTeam2 = teams[Math.floor(Math.random() * teams.length)];
  }
  const randomScore1 = Math.floor(Math.random() * 5);
  const randomScore2 = Math.floor(Math.random() * 5);
  return {
    Team1Name: randomTeam1,
    Team2Name: randomTeam2,
    Team1Score: randomScore1,
    Team2Score: randomScore2,
  };
};

export const createNewGames = async (count: number = 1) => {
  const games = [];
  // create a loop for the number of games to create
  for (let i = 0; i < count; i++) {
    const newGame = await client.graphql({
      query: createGame,
      variables: { input: createRandomGame() },
    });
    games.push(newGame);
  }

  return games;
};

export const useFetchGames = () => {
  const [games, setGames] = useState<Game[]>([]);

  const fetchGames = async () => {
    const { data } = await client.graphql({ query: listGames });
    const allGames: Game[] = data?.listGames?.items;
    console.log("All games", allGames);
    setGames(allGames);
  };

  useEffect(() => {
    fetchGames();
    // Subscribe to creation of new games
    const createSub = client
      .graphql({ query: subscriptions.onCreateGame })
      .subscribe({
        next: ({ data }) => {
          console.log("Create Game Subscription", data.onCreateGame);
          setGames((prevGames) => [data.onCreateGame, ...prevGames]);
        },
        error: (error) => console.warn(error),
      });
    // Subscribe to update of games
    const updateSub = client
      .graphql({ query: subscriptions.onUpdateGame })
      .subscribe({
        next: ({ data }) => {
          console.log("Update Game Subscription", data.onUpdateGame);
          setGames((prevGames) =>
            prevGames.map((game) =>
              game.id === data.onUpdateGame.id
                ? { ...game, ...data.onUpdateGame }
                : game,
            ),
          );
        },
        error: (error) => console.warn(error),
      });

    return () => {
      createSub.unsubscribe();
      updateSub.unsubscribe();
    };
  }, []);

  return games;
};

/// <reference types="node" />
import readline from "node:readline/promises";

type Player = {
  name: string;
  velocidade: number;
  manobrabilidade: number;
  poder: number;
};

const players: Player[] = [
  {
    name: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
  },
  {
    name: "Peach",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
  },
  {
    name: "Yoshi",
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
  },
  {
    name: "Bowser",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
  },
  {
    name: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
  },
  {
    name: "Donkey Kong",
    velocidade: 2,
    manobrabilidade: 2,
    poder: 5,
  },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function selectPlayer(): Promise<[Player, Player]> {
  console.log("------------------------------------------------\n");

  console.log("Seleção de Pilotos:\n");
  players.forEach((player, index) => {
    console.log(`${index + 1}. ${player.name}`);
  });

  const selectedPlayer1 = Number(
    await rl.question("Selecione o jogador 1 (1-6): \n"),
  );
  const selectedPlayer2 = Number(
    await rl.question("Selecione o jogador 2 (1-6): \n"),
  );

  if (
    Number.isNaN(selectedPlayer1) ||
    Number.isNaN(selectedPlayer2) ||
    selectedPlayer1 < 1 ||
    selectedPlayer1 > players.length ||
    selectedPlayer2 < 1 ||
    selectedPlayer2 > players.length
  ) {
    console.log("Seleção inválida. Reinicie e escolha valores entre 1 e 6.");
  }
  rl.close();

  return [players[selectedPlayer1 - 1], players[selectedPlayer2 - 1]];
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function createRoad(): Promise<string> {
  const road = ["reta", "curva", "confronto"];
  return road[Math.floor(Math.random() * 3)];
}

async function logRoll(
  characterName: string,
  resultDice: number,
  attribute: string,
  attributeValue: number,
) {
  console.log(
    `🚗 ${characterName} rolou ${resultDice} em ${attribute} e tem ${attributeValue} de atributo, total de ${resultDice + attributeValue}.`,
  );
}

type Placar = {
  player1: {
    name: string;
    points: number;
  };
  player2: {
    name: string;
    points: number;
  };
};

async function playRaceEngine(
  player1: Player,
  player2: Player,
  placar: Placar,
) {
  let road = await createRoad();

  let resultDiceOne = await rollDice();
  let resultDiceTwo = await rollDice();

  let total1 = 0;
  let total2 = 0;
  switch (road) {
    case "reta":
      total1 = resultDiceOne + player1.velocidade;
      total2 = resultDiceTwo + player2.velocidade;
      await logRoll(
        player1.name,
        resultDiceOne,
        "velocidade",
        player1.velocidade,
      );
      await logRoll(
        player2.name,
        resultDiceTwo,
        "velocidade",
        player2.velocidade,
      );
      if (total1 > total2) {
        placar.player2.points++;
        console.log(`🚗 ${player1.name} venceu a rodada!`);
      }
      if (total1 < total2) {
        placar.player1.points++;
        console.log(`🚗 ${player2.name} venceu a rodada!`);
      }
      total1 === total2 && console.log("Empate! Ninguém pontua.");
      break;
    case "curva":
      total1 = resultDiceOne + player1.manobrabilidade;
      total2 = resultDiceTwo + player2.manobrabilidade;
      await logRoll(
        player1.name,
        resultDiceOne,
        "manobrabilidade",
        player1.manobrabilidade,
      );
      await logRoll(
        player2.name,
        resultDiceTwo,
        "manobrabilidade",
        player2.manobrabilidade,
      );
      if (total1 > total2) {
        placar.player2.points++;
        console.log(`🚗 ${player1.name} venceu a rodada!`);
      }
      if (total1 < total2) {
        placar.player1.points++;
        console.log(`🚗 ${player2.name} venceu a rodada!`);
      }
      total1 === total2 && console.log("Empate! Ninguém pontua.");
      break;
    default:
      total1 = resultDiceOne + player1.poder;
      total2 = resultDiceTwo + player2.poder;
      await logRoll(player1.name, resultDiceOne, "poder", player1.poder);
      await logRoll(player2.name, resultDiceTwo, "poder", player2.poder);
      if (total1 > total2 && placar.player2.points) {
        placar.player2.points--;
        console.log(`🚗 ${player1.name} venceu a rodada!`);
      }
      if (total1 < total2 && placar.player1.points) {
        placar.player1.points--;
        console.log(`🚗 ${player2.name} venceu a rodada!`);
      }
      total1 === total2 && console.log("Empate! Ninguém pontua.");
  }
}

async function main() {
  const [player1, player2] = await selectPlayer();
  console.log("------------------------------------------------\n");
  console.log(`Jogadores selecionados: ${player1.name} e ${player2.name}\n`);
  console.log(
    `🏁🚨 Corrida entre ${player1.name} e ${player2.name} começando ...\n`,
  );

  let placar: Placar = {
    player1: {
      name: player1.name,
      points: 0,
    },
    player2: {
      name: player2.name,
      points: 0,
    },
  };

  for (let i = 0; i < 5; i++) {
    console.log("------------------------------------------------");

    console.log(`🏁 ${i + 1}° rodada`);

    await playRaceEngine(player1, player2, placar);
  }
  placar.player1.points === placar.player2.points
    ? console.log("A corrida terminou empatada!\n")
    : placar.player1.points > placar.player2.points
      ? console.log(`${player1.name} venceu a corrida!\n`)
      : console.log(`${player2.name} venceu a corrida!\n`);

  console.log(
    `Placar Final: ${player1.name} ${placar.player1.points} x ${placar.player2.points} ${player2.name}`,
  );
}

main();

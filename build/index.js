var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/// <reference types="node" />
import readline from "node:readline/promises";
const players = [
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
function selectPlayer() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("------------------------------------------------\n");
        console.log("Seleção de Pilotos:\n");
        players.forEach((player, index) => {
            console.log(`${index + 1}. ${player.name}`);
        });
        const selectedPlayer1 = Number(yield rl.question("Selecione o jogador 1 (1-6): \n"));
        const selectedPlayer2 = Number(yield rl.question("Selecione o jogador 2 (1-6): \n"));
        if (Number.isNaN(selectedPlayer1) ||
            Number.isNaN(selectedPlayer2) ||
            selectedPlayer1 < 1 ||
            selectedPlayer1 > players.length ||
            selectedPlayer2 < 1 ||
            selectedPlayer2 > players.length) {
            console.log("Seleção inválida. Reinicie e escolha valores entre 1 e 6.");
        }
        rl.close();
        return [players[selectedPlayer1 - 1], players[selectedPlayer2 - 1]];
    });
}
function rollDice() {
    return __awaiter(this, void 0, void 0, function* () {
        return Math.floor(Math.random() * 6) + 1;
    });
}
function createRoad() {
    return __awaiter(this, void 0, void 0, function* () {
        const road = ["reta", "curva", "confronto"];
        return road[Math.floor(Math.random() * 3)];
    });
}
function logRoll(characterName, resultDice, attribute, attributeValue) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`🚗 ${characterName} rolou ${resultDice} em ${attribute} e tem ${attributeValue} de atributo, total de ${resultDice + attributeValue}.`);
    });
}
function playRaceEngine(player1, player2, placar) {
    return __awaiter(this, void 0, void 0, function* () {
        let road = yield createRoad();
        let resultDiceOne = yield rollDice();
        let resultDiceTwo = yield rollDice();
        let total1 = 0;
        let total2 = 0;
        switch (road) {
            case "reta":
                total1 = resultDiceOne + player1.velocidade;
                total2 = resultDiceTwo + player2.velocidade;
                yield logRoll(player1.name, resultDiceOne, "velocidade", player1.velocidade);
                yield logRoll(player2.name, resultDiceTwo, "velocidade", player2.velocidade);
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
                yield logRoll(player1.name, resultDiceOne, "manobrabilidade", player1.manobrabilidade);
                yield logRoll(player2.name, resultDiceTwo, "manobrabilidade", player2.manobrabilidade);
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
                yield logRoll(player1.name, resultDiceOne, "poder", player1.poder);
                yield logRoll(player2.name, resultDiceTwo, "poder", player2.poder);
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
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const [player1, player2] = yield selectPlayer();
        console.log("------------------------------------------------\n");
        console.log(`Jogadores selecionados: ${player1.name} e ${player2.name}\n`);
        console.log(`🏁🚨 Corrida entre ${player1.name} e ${player2.name} começando ...\n`);
        let placar = {
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
            yield playRaceEngine(player1, player2, placar);
        }
        placar.player1.points === placar.player2.points
            ? console.log("A corrida terminou empatada!\n")
            : placar.player1.points > placar.player2.points
                ? console.log(`${player1.name} venceu a corrida!\n`)
                : console.log(`${player2.name} venceu a corrida!\n`);
        console.log(`Placar Final: ${player1.name} ${placar.player1.points} x ${placar.player2.points} ${player2.name}`);
    });
}
main();

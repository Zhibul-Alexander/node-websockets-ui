import WebSocket from 'ws';

import { GAMES, WS_PLAYERS } from '../store/index.js';
import { Game, Player } from '../types/index.js';
import { TYPES } from '../constants.js';

export const startGame = () => {
  const game = GAMES.find((game: Game) => game.state === 'waiting');

  if (game) {
    const everyPlayerWithShip = game.players.every((player: Player) => player.ships.length > 0);

    if (everyPlayerWithShip) {
      game.state = 'in-progress';

      WS_PLAYERS.forEach((idPlayer: number, webSocket: WebSocket) => {
        const hasMatchingPlayer = game.players.some((player: Player) => player.idPlayer === idPlayer);

        if (hasMatchingPlayer) {
          const foundPlayer = game.players.find((player: Player) => player.idPlayer === idPlayer);
          const ships = foundPlayer ? foundPlayer.ships : null;

          const response = JSON.stringify({
            type: TYPES.START_GAME,
            data: JSON.stringify({ ships: ships, currentPlayerIndex: idPlayer }),
            id: 0,
          });
          webSocket.send(response);
        }
      });
    }
  }

};
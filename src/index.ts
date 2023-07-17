import WebSocket from 'ws';

import { MainController } from './controllers/mainController.js';
import { updateRoom } from './controllers/updateRoom.js';
import { createGame } from './controllers/createGame.js';
import { startGame } from './controllers/startGame.js';
import { notifyPlayersOfTurn } from './controllers/notifyPlayersOfTurn.js';

import { transformResponseToJSON } from './utils/index.js';

import { WebSocketPayload, User, AddShips, Attack } from './types/index.js';
import { TYPES } from './constants.js';

const mainController = new MainController();

export const handler = async (webSocket: WebSocket, dataMessage: Buffer) => {
  try {
    let result;
    let parsedDataMessage = JSON.parse(dataMessage.toString());

    if (parsedDataMessage.data) {
      const data = JSON.parse(parsedDataMessage.data);
      parsedDataMessage = { ...parsedDataMessage, data };
    }

    switch (parsedDataMessage.type) {
      case TYPES.REG:
        result = await mainController.registerUser(webSocket, parsedDataMessage as WebSocketPayload<User>);
        webSocket.send(transformResponseToJSON(result));
        break;
      case TYPES.CREATE_ROOM:
        result = await mainController.createRoom(webSocket, parsedDataMessage as WebSocketPayload<string>);
        updateRoom(transformResponseToJSON(result));
        break;
      case TYPES.ADD_USER_TO_ROOM:
        result = await mainController.addUserToRoom(webSocket, parsedDataMessage as WebSocketPayload<{ indexRoom: number }>);
        createGame(result);
        break;
      case TYPES.ADD_SHIPS:
        const idGame = await mainController.addShips(webSocket, parsedDataMessage as WebSocketPayload<AddShips>);

        if (idGame) {
          const isStarted = await startGame(idGame);

          if (isStarted) {
            await notifyPlayersOfTurn(idGame);
          }
        }
        break;
      case TYPES.ATTACK:
        await mainController.attack(webSocket, parsedDataMessage as WebSocketPayload<Attack>);
        break;
      default:
        console.log('Unknown message type');
    }
  } catch (e) {
    console.log(e);
  }
};
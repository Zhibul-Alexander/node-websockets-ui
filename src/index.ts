import WebSocket from 'ws';

import { MainController } from './controllers/mainController';
import { updateRoom } from './controllers/updateRoom';
import { createGame } from './controllers/createGame';
import { startGame } from './controllers/startGame';

import { transformResponseToJSON } from './utils';

import { WebSocketPayload, User, AddShips } from './types';
import { TYPES } from './constants';

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
        await mainController.addShips(webSocket, parsedDataMessage as WebSocketPayload<AddShips>);
        startGame();
        break;
      default:
        console.log('Unknown message type');
    }
  } catch (e) {
    console.log(e);
  }
};
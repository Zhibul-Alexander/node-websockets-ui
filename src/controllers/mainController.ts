import WebSocket from 'ws';

import { WS_PLAYERS, USERS, ROOMS, GAMES } from '../store/index.js';
import { WebSocketPayload, User, UserResponse, UserWithId, Room, Game, Player, AddShips } from '../types/index.js';
import { TYPES } from '../constants.js';

export class MainController {
  public async registerUser(webSocket: WebSocket, dataMessage: WebSocketPayload<User>): Promise<WebSocketPayload<UserResponse>> {
    const { type, data, id } = dataMessage;

    const userId = WS_PLAYERS.get(webSocket)!;
    const responseData = { error: false, errorText: '' };
    const isUserExists = USERS.find((user: UserWithId) => user.name === data.name && user.password === data.password);

    if (!isUserExists) {
      USERS.push({ ...data, id: userId });
    }

    return { type, data: { ...data, ...responseData }, id };
  }

  public async createRoom(webSocket: WebSocket, dataMessage: WebSocketPayload<string>): Promise<WebSocketPayload<Room[]>> {
    const { id } = dataMessage;

    const userId = WS_PLAYERS.get(webSocket)!;
    const user = USERS.find((user: UserWithId) => user.id === userId);

    if (user) {
      const room: Room = { roomId: userId, roomUsers: [{ name: user.name, index: userId }] };
      ROOMS.push(room);

      const filteredRooms = ROOMS.filter((room) => room.roomUsers.length < 2);

      return { type: TYPES.UPDATE_ROOM, data: filteredRooms, id };
    } else {
      throw new Error('User not found');
    }
  }

  public async addUserToRoom(webSocket: WebSocket, dataMessage: WebSocketPayload<{ indexRoom: number }>): Promise<number> {
    const userId = WS_PLAYERS.get(webSocket)!;

    const newGame: Game = {
      idGame: GAMES.length,
      state: 'waiting',
      players: [
        {
          idPlayer: userId,
          isWinner: false,
          ships: [],
        },
      ],
    };

    const otherUsers = USERS.filter((user: UserWithId) => user.id !== userId);
    if (otherUsers.length > 0) {
      const firstOtherUser = otherUsers[0];
      if (firstOtherUser !== undefined) {
        newGame.players.push({
          idPlayer: firstOtherUser.id,
          isWinner: false,
          ships: [],
        });
      }
    }

    GAMES.push(newGame);

    const roomIndex = ROOMS.findIndex((room: Room) => room.roomId === dataMessage.data.indexRoom);

    if (roomIndex !== -1) {
      ROOMS.splice(roomIndex, 1);
    }

    return newGame.idGame;
  }

  public async addShips(webSocket: WebSocket, dataMessage: WebSocketPayload<AddShips>): Promise<void> {
    const { data } = dataMessage;

    const userId = WS_PLAYERS.get(webSocket)!;
    const game = GAMES.find((game: Game) => game.idGame === data.gameId);

    if (game) {
      const player = game.players.find((player: Player) => player.idPlayer === userId);

      if (player) {
        player.ships = data.ships;
      }
    }
  }
}
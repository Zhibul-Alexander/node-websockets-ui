import WebSocket from 'ws';

import { TYPES, SHIP_TYPES, GAME_TYPES } from '../constants';

export interface RegistrationRequest {
  type: typeof TYPES.REG,
  data: {
    name: string,
    password: string,
  },
  id: number,
}

export interface RegistrationResponse {
  type: typeof TYPES.REG,
  data: {
    name: string,
    index: number,
    error: boolean,
    errorText: string,
  },
  id: number,
}

export interface UpdateWinners {
  type: typeof TYPES.UPDATE_WINNERS,
  data: [
    {
      name: string,
      password: string,
    },
  ],
  id: number,
}

export interface CreateRoom {
  type: typeof TYPES.CREATE_ROOM;
  data: {
    indexRoom: number,
  };
  id: number;
}

export interface CreateNewRoom {
  type: typeof TYPES.CREATE_ROOM;
  data: string,
  id: number;
}

export interface AddUserToRoom {
  type: typeof TYPES.ADD_USER_TO_ROOM;
  data: {
    indexRoom: number;
  };
  id: number;
}

export interface UpdateRoom {
  type: typeof TYPES.CREATE_GAME;
  data: [
    {
      roomId: number,
      roomUsers: [
        {
          name: string,
          index: number,
        }
      ]
    },
  ];
  id: number;
}

export interface StartGame {
  type: typeof TYPES.START_GAME;
  data: {
    ships: [
      {
        position: {
          x: number,
          y: number,
        },
        direction: boolean,
        length: number,
        type: 'small' | 'medium' | 'large' | 'huge',
      }
    ],
    currentPlayerIndex: number
  };
  id: number;
}

export interface Attack {
  type: typeof TYPES.ATTACK;
  data: {
    gameId: number,
    x: number,
    y: number,
    indexPlayer: number,
  };
  id: number;
}

export interface RandomAttack {
  type: typeof TYPES.RANDOM_ATTACK;
  data: {
    gameId: number,
    indexPlayer: number,
  };
  id: number;
}

export interface Turn {
  type: typeof TYPES.TURN;
  data: {
    currentPlayer: number,
  };
  id: number;
}

export interface Finish {
  type: typeof TYPES.FINISH;
  data: {
    winPlayer: number,
  };
  id: number;
}

export interface WebSocketPlayerInfo extends WebSocket {
  playerInfo: {
    name: string;
    password: string;
    index: string;
  };
}

export type DataRequest =
  | RegistrationRequest['data']
  | CreateNewRoom['data']
  | AddUserToRoom['data']
  | AddShips['data']
  | Attack['data']
  | RandomAttack['data'];

export interface User {
  name: string,
  password: string,
}

export interface Ship {
  position: {
    x: number,
    y: number,
  },
  direction: boolean,
  length: number,
  type: SHIP_TYPES,
}

export interface Player {
  idPlayer: number,
  isWinner: boolean,
  ships: Ship[],
}

export interface RoomUser {
  name: string,
  index: number,
}

export interface UserResponse extends User {
  error: boolean,
  errorText: string,
}

export interface UserWithId extends User {
  id: number,
}

export interface WebSocketWithId extends WebSocket {
  id: number,
}

export interface WebSocketPayload<T> {
  type: TYPES;
  data: T;
  id: number;
}

export interface Game {
  idGame: number,
  state: GAME_TYPES,
  players: Player[],
}

export interface CreateGame {
  idGame: number,
  idPlayer: number,
}

export interface StartGameDtoModel {
  ships: Ship[],
  currentPlayerIndex: number,
}

export interface Room {
  roomId: number,
  roomUsers: RoomUser[],
}

export interface AddShips {
  gameId: number,
  ships: Ship[],
  indexPlayer: number,
}
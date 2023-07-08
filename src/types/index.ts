import { TYPES } from '../constants';

export interface RegistrationRequest {
  type: typeof TYPES.REG;
  data: {
    name: string;
    password: string;
  };
  id: number;
}

export interface RegistrationResponse {
  type: typeof TYPES.REG;
  data: {
    name: string;
    index: number;
    error: boolean;
    errorText: string;
  };
  id: number;
}

export interface UpdateWinners {
  type: typeof TYPES.UPDATE_WINNERS;
  data: [
    {
      name: string;
      password: string;
    },
  ];
  id: number;
}

export interface CreateRoom {
  type: typeof TYPES.CREATE_ROOM;
  data: {
    indexRoom: number,
  };
  id: number;
}

export interface CreateGame {
  type: typeof TYPES.CREATE_GAME;
  data: {
    idGame: number,
    idPlayer: number,
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

export interface AddShips {
  type: typeof TYPES.ADD_SHIPS;
  data: {
    gameId: number,
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
    indexPlayer: number
  };
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
export const TYPES = {
  REG: 'reg',
  UPDATE_WINNERS: 'update_winners',
  CREATE_ROOM: 'create_room',
  ADD_USER_TO_ROOM: 'add_user_to_room',
  CREATE_GAME: 'create_game',
  UPDATE_ROOM: 'update_room',
  ADD_SHIPS: 'add_ships',
  START_GAME: 'start_game',
  ATTACK: 'attack',
  RANDOM_ATTACK: 'randomAttack',
  TURN: 'turn',
  FINISH: 'finish',
};

export const SHIP_TYPES = 'small' | 'medium' | 'large' | 'huge';

export const GAME_TYPES = 'waiting' | 'in-progress' | 'finished';

export const ACTION_TYPES = {
  KILLED: 'killed',
  SHOT: 'shot',
  MISS: 'miss',
};

export const DATA_FIELDS = {
  TYPE: 'type',
  DATA: 'data',
  ID: 'id',
} as const;
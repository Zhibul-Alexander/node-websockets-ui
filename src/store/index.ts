import WebSocket from 'ws';

import { Game, Room, UserWithId } from '../types';

export const GAME_RESULTS = [];

export const GAMES: Game[] = [];

export const ROOMS: Room[] = [];

export const USERS: UserWithId[] = [];

export const WS_PLAYERS = new Map<WebSocket, number>;
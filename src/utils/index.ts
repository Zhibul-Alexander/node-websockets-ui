import { WebSocketPayload } from '../types/index.js';

export const transformResponseToJSON = (response: WebSocketPayload<unknown>) => {
  return JSON.stringify({ ...response, data: JSON.stringify(response.data) });
};
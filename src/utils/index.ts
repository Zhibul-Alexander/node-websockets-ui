import { WebSocketPayload } from '../types';

export const transformResponseToJSON = (response: WebSocketPayload<unknown>) => {
  return JSON.stringify({ ...response, data: JSON.stringify(response.data) });
};
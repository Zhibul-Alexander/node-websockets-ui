import { WebSocketServer, RawData } from 'ws';

import { CreateData } from './createData';
import { WebSocketPlayerInfo } from '../types';
import { TYPES, DATA_FIELDS } from '../constants';

export class Create {
  public wsClient: WebSocketPlayerInfo;
  public wsServer: WebSocketServer;
  private dataHandlers: CreateData;

  constructor(wsServer: WebSocketServer) {
    this.wsServer = wsServer;
  }

  public connection = (wsClient: WebSocketPlayerInfo): void => {
    this.wsClient = wsClient;
    this.dataHandlers = new CreateData(this.wsClient);

    wsClient.on('message', this.message);

    wsClient.on('error', (err) => {
      console.log(err);
    });

    wsClient.on('close', this.disconnect);

    wsClient.send('Websocket server ready');
  };

  private message = (data: RawData): void => {
    const parsedData = JSON.parse(data.toString());

    const isValidData = this.validWebSocketData(parsedData);

    if (isValidData) {
      const webSocketDataResponse = this.dataHandlers.webSocketDataHandler(parsedData);

      console.log('first', this.wsClient);
      this.wsClient.send(webSocketDataResponse);
    }
  };

  private disconnect = (): void => {
    console.log('WebSocket client disconnect');
  };

  private validWebSocketData = (wsClientData: unknown): boolean => {
    const templateDataFields = Object.values(DATA_FIELDS);

    if (wsClientData && typeof wsClientData === 'object') {
      const keys = Object.keys(wsClientData);
      if (templateDataFields.length === keys.length) {
        return templateDataFields.every((templateDataField) => templateDataField in wsClientData);
      }

      return false;
    }
    return false;
  };
}
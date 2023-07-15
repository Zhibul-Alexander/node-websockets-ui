import { RegistrationPlayer } from './registrationPlayer';

import { TYPES } from '../constants';
import { RegistrationRequest, DataPacket, WebSocketPlayerInfo, DataRequest, ResponseAnswer } from '../types';

export class CreateData {
  public clientState: WebSocketPlayerInfo;
  protected responseHandlers: RegistrationPlayer;

  constructor(wsClient: WebSocketPlayerInfo) {
    this.clientState = wsClient;
    this.responseHandlers = new RegistrationPlayer(wsClient);
  }

  public webSocketDataHandler = (requestWebSocketData: DataPacket): string => {
    const webSocketData: DataRequest =
      typeof requestWebSocketData.data === 'string' ? JSON.parse(requestWebSocketData.data) : requestWebSocketData.data;

    switch (requestWebSocketData.type) {
      case TYPES.REG: {
        return this.responseHandlers.registrationPlayerHandler(this.isValidData<RegistrationRequest['data']>(webSocketData));
      }

      default: {
        break;
      }
    }
    return 'create';
  };

  protected isValidData = <T extends DataRequest>(webSocketData: DataRequest): T | ResponseAnswer => {
    const data = webSocketData;
    if (
      data &&
      typeof data === 'object' &&
      'name' in data &&
      typeof data.name === 'string' &&
      data.name.length >= 5 &&
      'password' in data &&
      typeof data.password === 'string' &&
      data.password.length >= 5
    ) {
      return webSocketData as T;
    }

    return { error: true, errorText: 'Invalid data' };
  };
}
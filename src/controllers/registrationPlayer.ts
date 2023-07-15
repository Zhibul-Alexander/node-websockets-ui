import { v4 as uuidv4 } from 'uuid';

import { TYPES } from '../constants';
import { RegistrationRequest, ResponseAnswer, WebSocketPlayerInfo } from '../types';

export class RegistrationPlayer {
  public clientState: WebSocketPlayerInfo;

  constructor(wsClient: WebSocketPlayerInfo) {
    this.clientState = wsClient;
  }

  public registrationPlayerHandler = (webSocketData: RegistrationRequest['data'] | ResponseAnswer): string => {
    if ('error' in webSocketData) {
      const dataObjectPlayerResponse = {
        type: TYPES.REG,
        data: JSON.stringify({
          name: '',
          index: '',
          error: true,
          errorText: webSocketData.errorText,
        }),
      };
      return JSON.stringify(dataObjectPlayerResponse);
    }

    const { name, password } = webSocketData;

    const newUser = {
      name: name,
      password: password,
      index: uuidv4(),
    };

    const dataObjectPlayerResponse = {
      type: TYPES.REG,
      data: JSON.stringify({
        name: name,
        index: newUser.index,
        error: false,
        errorText: '',
      }),
    };

    this.clientState.playerInfo = newUser;

    return JSON.stringify(dataObjectPlayerResponse);
  };
}
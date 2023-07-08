import { WebSocketServer } from 'ws';

import { Create } from '../controllers/create';

export class CreateWebSocketServer {
  public wss: WebSocketServer;

  protected controllers: Create;

  constructor(public port: number) {
    this.port = port;

    this.wss = new WebSocketServer({ port });

    this.controllers = new Create();

    this.createListener();
  }

  private createListener = (): void => {
    this.wss.on('connection', this.controllers.connection);
  }
}
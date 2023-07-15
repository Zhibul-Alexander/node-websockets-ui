import { WebSocketServer } from 'ws';

import { Create } from './create';

export class MainController {
  public wss: WebSocketServer;

  protected handlers: Create;

  constructor(public port: number) {
    this.port = port;
    this.wss = new WebSocketServer({ port });
    this.handlers = new Create(this.wss);
    this.createListener();
  }

  private createListener(): void {
    this.wss.on('connection', this.handlers.connection);
    this.wss.on('close', this.serverClose);
  }

  public serverClose = (): void => {
    console.log('server closed');
  };
}
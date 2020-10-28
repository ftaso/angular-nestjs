import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  editorAccount = 0;
  viewList = [];

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any): WsResponse<string> {
    const req = JSON.parse(data);
    const res = {
      editorAccount: this.editorAccount,
      viewList: this.viewList,
      mode: req.mode
    };
    switch (req.mode) {
      case 'edit':
        if (this.editorAccount && this.editorAccount !== req.accountId) {
          res.mode = 'exist';
          return { event: 'message', data: JSON.stringify(res) };
        }
        this.editorAccount = req.accountId;
        break;
      case 'view':
        this.viewList.push(req.accountId);
        break;
      case 'exit':
        switch (req.beforeMode) {
          case 'edit':
            this.editorAccount = 0;
            break;
          case 'view':
            this.viewList = this.viewList.filter(a => a !== req.accountId);
            break;
        }
        break;
    }
    return { event: 'message', data: JSON.stringify(res) };
  }

  @SubscribeMessage('broadcast')
  broadcast(@MessageBody() data: any): void {
    console.log(data)
    this.server.emit('broadcast', data);
  }
}

import EventBus from "./EventBus";

export enum SocketEvents {
  Message = 'message',
  Close = 'close'
}

export default class WSTransport extends EventBus {
  private socket: WebSocket | null = null;
  private url: string;
  private pingInterval: number | null = null;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public connect() {
    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);

    return new Promise<void>((resolve, reject) => {
      this.socket!.addEventListener('open', () => {
        this.setupPinPong();
        resolve();
      });
      this.socket!.addEventListener('close', reject);
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);

      if (data?.type === 'pong') {
        return;
      }

      this.emit(SocketEvents.Message, data);
    });

    socket.addEventListener('close', () => {
      this.emit(SocketEvents.Close);
    });
  }

  send(data: unknown) {
    if (!this.socket) {
      throw new Error('Websocket connection is not established yet');
    }

    this.socket.send(JSON.stringify(data));
  }

  private setupPinPong() {
    this.pingInterval = setInterval(() => {
      this.send({
        type: 'ping'
      });
    }, 5000);
  }

  close() {
    clearInterval(this.pingInterval);
    this.socket?.close();
  }
}

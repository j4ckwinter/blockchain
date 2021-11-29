import Websocket, { RawData } from "ws";
import { Blockchain } from "../blockchain";
import { Chain } from "../blockchain/model/chain";

const P2P_PORT: number = process.env.P2P_PORT
  ? parseInt(process.env.P2P_PORT)
  : 5001;
const peers: string[] = process.env.PEERS ? process.env.PEERS.split(",") : [];

export class P2pServer {
  blockchain: Blockchain;
  sockets: Websocket[];

  constructor(blockchain: Blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new Websocket.Server({ port: P2P_PORT });
    server.on("connection", (socket: Websocket) => this.connectSocket(socket));
    this.connectToPeers();
    console.log(`Listening for peer-to-peer connections on ${P2P_PORT}`);
  }

  connectToPeers(): void {
    peers.forEach((peer: string) => {
      const socket: Websocket = new Websocket(peer);
      socket.on("open", () => this.connectSocket(socket));
    });
  }

  connectSocket(socket: Websocket): void {
    this.sockets.push(socket);
    console.log("Socket connected.");
    this.messageHandler(socket);
    this.sendChain(socket);
  }

  messageHandler(socket: Websocket): void {
    socket.on("message", (data: RawData) => {
      const chain: Chain = JSON.parse(data.toString());
      this.blockchain.replaceChain(chain.chain);
    });
  }

  sendChain(socket: Websocket): void {
    socket.send(JSON.stringify(this.blockchain));
  }

  syncChains(): void {
    this.sockets.forEach(socket => {
      this.sendChain(socket)
    });
  }
}

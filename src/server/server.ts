import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import { Blockchain } from "../blockchain";
import { P2pServer } from "./p2p-server";

const HTTP_PORT: number = process.env.HTTP_PORT
  ? parseInt(process.env.HTTP_PORT)
  : 3001;
const server: Express = express();
const blockchain: Blockchain = new Blockchain();
const p2pServer: P2pServer = new P2pServer(blockchain);

server.use(helmet());
server.use(express.json());

server.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));

server.get("/", (req: Request, res: Response) => {
  res.json("Hello from the BlockChain");
});

server.post("/mine", (req: Request, res: Response) => {
  res.json(blockchain.addBlock(req.body.data));
  p2pServer.syncChains();
});

p2pServer.listen();

import express, {Express, Request, Response} from "express";
import helmet from "helmet";

const HTTP_PORT: number = process.env.HTTP_PORT
    ? parseInt(process.env.HTTP_PORT)
    : 3001;
const server: Express = express();

server.use(helmet());
server.use(express.json());

server.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));

server.get("/", (req: Request, res: Response) => {
    res.json("Hello from the TypeScript world");
});
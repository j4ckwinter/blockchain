import { Block } from "../model";
import SHA256 from "crypto-js/sha256";

export class BlockService {
  static genesis(): Block {
    return {
      timestamp: 1,
      lastHash: "l45t-h45h",
      hash: "f1r57-h45h",
      data: [],
    };
  }

  static mineBlock(lastBlock: Block, data: any): Block {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    return {
      timestamp,
      lastHash,
      hash: BlockService.hash(timestamp, lastHash, data),
      data,
    };
  }

  static hash(timestamp: number, lastHash: string, data: any): string {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }

  static blockHash(block: Block): string {
    const { timestamp, lastHash, data }: Block = block;
    return BlockService.hash(timestamp, lastHash, data);
  }
}

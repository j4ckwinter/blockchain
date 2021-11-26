import { Block } from "./model";
import { BlockService } from "./service";

export class BlockchainApi {
  chain: Block[];

  constructor() {
    this.chain = [BlockService.genesis()];
  }

  addBlock(data: any): Block[] {
    this.chain.push(
      BlockService.mineBlock(this.chain[this.chain.length - 1], data)
    );
    return this.chain;
  }

  isValidChain(chain: Block[]): boolean {
    if (JSON.stringify(chain[0]) !== JSON.stringify(BlockService.genesis())) {
      return false;
    }
    for (let i: number = 1; i < chain.length; i++) {
      const block: Block = chain[i];
      const lastBlock: Block = chain[i - 1];
      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== BlockService.blockHash(block)
      ) {
        return false;
      }
    }
    return true;
  }
}

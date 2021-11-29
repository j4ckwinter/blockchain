import { Block } from "./model";
import { BlockService } from "./service";

export class Blockchain {
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
    console.log(chain);
    console.log([BlockService.genesis()]);
    if (JSON.stringify(chain[0]) !== JSON.stringify(BlockService.genesis())) {
      console.log("First item does not equal genesis");
      return false;
    }
    for (let i: number = 1; i < chain.length; i++) {
      const block: Block = chain[i];
      const lastBlock: Block = chain[i - 1];
      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== BlockService.blockHash(block)
      ) {
        console.log("The hash values of this chain are invalid");
        return false;
      }
    }
    return true;
  }

  replaceChain(newChain: Block[]): void {
    if (newChain.length <= this.chain.length) {
      console.log("Received chain is not longer than current chain");
      return;
    } else if (!this.isValidChain(newChain)) {
      console.log("Received chain is not valid");
      return;
    }
    console.log("Replacing blockchain with the new chain");
    this.chain = newChain;
  }
}

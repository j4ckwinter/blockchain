import { Blockchain } from "./blockchain";
import { BlockService } from "./service";

describe("Blockchain", () => {
  describe("Genesis", () => {
    it("first element of chain should equal genesis", () => {
      // given
      const blockchain = new Blockchain();
      // when
      // then
      expect(blockchain.chain[0]).toEqual(BlockService.genesis());
    });
  });
  describe("addBlock", () => {
    it("should add a new block to the chain", () => {
      // given
      const blockchain = new Blockchain();
      const data: any = "foo";
      // when
      blockchain.addBlock(data);
      // then
      expect(blockchain.chain.length).toEqual(2);
      expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
      expect(blockchain.chain[blockchain.chain.length - 1].lastHash).toEqual(
        BlockService.genesis().hash
      );
    });
  });
  describe("Validation", () => {
    it("should validate a valid chain", () => {
      // given
      const firstBlockchain = new Blockchain();
      const secondBlockchain = new Blockchain();
      // when
      secondBlockchain.addBlock("foo");
      // then
      expect(firstBlockchain.isValidChain(secondBlockchain.chain)).toBe(true);
    });
    it("should invalidate chain with invalid genesis block", () => {
      // given
      const firstBlockchain = new Blockchain();
      const secondBlockchain = new Blockchain();
      secondBlockchain.chain[0].data = "Bad data";
      // when
      const isValidChain: boolean = firstBlockchain.isValidChain(
        secondBlockchain.chain
      );
      // then
      expect(isValidChain).toBe(false);
    });
    it("should invalidate chain with corrupt chain", () => {
      // given
      const firstBlockchain = new Blockchain();
      const secondBlockchain = new Blockchain();
      secondBlockchain.addBlock("foo");
      secondBlockchain.chain[0].data = "Not foo";
      // when
      const isValidChain: boolean = firstBlockchain.isValidChain(
        secondBlockchain.chain
      );
      // then
      expect(isValidChain).toBe(false);
    });
  });
});

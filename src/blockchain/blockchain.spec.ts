import { BlockchainApi } from "./blockchain.api";
import { GENESIS_BLOCK } from "./model";

describe("Blockchain", () => {
  it("first element of chain should equal genesis", () => {
    // given
    const blockchain = new BlockchainApi();
    // when
    // then
    expect(blockchain.chain[0]).toEqual(GENESIS_BLOCK);
  });
  it("should add a new block to the chain", () => {
    // given
    const blockchain = new BlockchainApi();
    const data: any = "foo";
    // when
    blockchain.addBlock(data);
    // then
    expect(blockchain.chain.length).toEqual(2);
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
    expect(blockchain.chain[blockchain.chain.length - 1].lastHash).toEqual(
      GENESIS_BLOCK.hash
    );
  });
});

describe("Validation", () => {
  it("should validate a valid chain", () => {
    // given
    const firstBlockchain = new BlockchainApi();
    const secondBlockchain = new BlockchainApi();
    // when
    secondBlockchain.addBlock("foo");
    // then
    expect(firstBlockchain.isValidChain(secondBlockchain.chain)).toBe(true);
  });
  it("should invalidate chain with invalid genesis block", () => {
    // given
    const firstBlockchain = new BlockchainApi();
    const secondBlockchain = new BlockchainApi();
    // when
    secondBlockchain.chain[0].data = "Bad data";
    // then
    expect(firstBlockchain.isValidChain(secondBlockchain.chain)).toBe(false);
  });
  it("should invalidate chain with corrupt chain", () => {
    // given
    const firstBlockchain = new BlockchainApi();
    const secondBlockchain = new BlockchainApi();
    // when
    secondBlockchain.addBlock("foo");
    secondBlockchain.chain[0].data = "Not foo";
    // then
    expect(firstBlockchain.isValidChain(secondBlockchain.chain)).toBe(false);
  });
});

import { Block } from "../model";
import { BlockService } from "./block.service";

describe("mineBlock", () => {
  it("current block should have expected properties", () => {
    // given
    const lastBlock: Block = BlockService.genesis();
    const data: [] = [];
    // when
    const currentBlock: Block = BlockService.mineBlock(lastBlock, data);
    // then
    expect(currentBlock.lastHash).toEqual(lastBlock.hash);
    expect(currentBlock.data).toEqual(data);
  });
});

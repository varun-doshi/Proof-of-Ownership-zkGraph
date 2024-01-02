//@ts-ignore
import { require } from "@hyperoracle/zkgraph-lib";
import { Bytes, Event, Block, ByteArray } from "@hyperoracle/zkgraph-lib";

var addr_Azuki = Bytes.fromHexString(
  "0x1bcCd53adbE63DD352410B31ea3b63DCCB627f75"
);
var esig_Transfer = Bytes.fromHexString(
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
);

export function handleBlocks(blocks: Block[]): Bytes {
  let events: Event[] = blocks[0].events;

  let azukiHolders: ByteArray = ByteArray.empty();
  for (let i = events.length - 1; i >= 0; i--) {
    if (events[i].address == addr_Azuki && events[i].esig == esig_Transfer) {
      azukiHolders.concat(events[i].topic2);
    }
  }
  let state = Bytes.fromByteArray(azukiHolders);

  return state;
}

import type Block from "./block";

export default interface PlainTextBlock extends Block {
  type: "text";
}

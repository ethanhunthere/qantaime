import { Bag } from "@/shared/types";
import { totes } from "./data/totes";
import { crossbodies } from "./data/crossbody";
import { wallets } from "./data/wallets";

export const MOCK_BAGS: Bag[] = [
  ...wallets,
  ...totes,
  ...crossbodies,
];

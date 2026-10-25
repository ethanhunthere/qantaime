import { Bag } from "@/shared/types";
import { briefcases } from "./data/briefcases";
import { totes } from "./data/totes";
import { backpacks } from "./data/backpacks";
import { crossbodies } from "./data/crossbody";
import { weekenders } from "./data/weekenders";

export const MOCK_BAGS: Bag[] = [
  ...briefcases,
  ...totes,
  ...backpacks,
  ...crossbodies,
  ...weekenders,
];

import { svgs } from "./setup";
import { shuffleArray } from "./utils";

const regex: RegExp = /(\d+)-(.+)/;

export const randomArr = shuffleArray(svgs);

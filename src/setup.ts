const reqSvgs = require.context("../src/assets/cards", true, /\.svg$/);
export const svgs: any[] = reqSvgs
  .keys()
  .map((path) => ({ path, file: reqSvgs(path) }));

import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

if (process.env.WEBSITES) {
  fs.writeFileSync(
    "public/meta.js",
    `
  window.__WEBSITES__ = ${JSON.stringify(process.env.WEBSITES)};
`
  );
}

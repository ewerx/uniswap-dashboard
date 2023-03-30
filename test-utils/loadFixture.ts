import fs from "fs";
import path from "path";

export const loadFixture = <T>(fixtureName: string): T => {
  const fixturePath = path.join(__dirname, "fixtures", fixtureName);
  const rawData = fs.readFileSync(fixturePath, "utf8");
  return JSON.parse(rawData);
};

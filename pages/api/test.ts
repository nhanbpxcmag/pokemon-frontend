import { NextApiRequest, NextApiResponse } from "next";
import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const filePath = path.join(process.cwd(), "cache.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const objectData = JSON.parse(jsonData);
  res.status(200).json(objectData);
}

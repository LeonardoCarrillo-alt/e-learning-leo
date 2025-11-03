import multer from "multer";
import path from "path";
import fs from "fs";

const tmpDir = path.join(process.cwd(), "tmp");
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

export const upload = multer({ dest: tmpDir });

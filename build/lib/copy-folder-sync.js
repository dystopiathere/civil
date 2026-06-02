import fs from "node:fs";
import path from "node:path";

export function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) {
    return;
  }

  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach((element) => {
    if (fs.lstatSync(path.join(from, element)).isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    } else {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    }
  });
}

import { promisify } from "util";
import { unlink, readFile } from "fs";

export const promisifiedUnlink = promisify(unlink);

export const promisifiedReadFile = promisify(readFile);

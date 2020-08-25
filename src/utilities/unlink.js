import { promisify } from "util";
import { unlink } from "fs";

const promisifiedUnlink = promisify(unlink);

export default promisifiedUnlink;

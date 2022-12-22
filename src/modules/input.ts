import process from 'node:process';
import { compress, decompress } from './compression.js';
import { dirList, dirOpen, dirUp } from './directories.js';
import { fileAdd, fileCat, fileCopy, fileDelete, fileMove, fileRename } from './files.js';
import { fileHash } from './hash.js';
import { goodbye, greeting, home, invalidInput } from './messages.js';
import { osInfo } from './os.js';

const user = process.argv[4].slice(7);

greeting(user);

let location = home;

const inputHandler = (chunk: Buffer) => {
  const [command, param1, param2] = chunk.toString().trim().split(' ');

  try {
    switch (command) {
      case '.exit':
        process.exit(0);
        break;
      case 'up':
        location = dirUp(location);
        break;
      case 'cd':
        location = dirOpen(location, param1);
        break;
      case 'ls':
        dirList(location);
        break;
      case 'cat':
        fileCat(location, param1);
        break;
      case 'add':
        fileAdd(location, param1);
        break;
      case 'rn':
        fileRename(location, param1, param2);
        break;
      case 'cp':
        fileCopy(location, param1, param2);
        break;
      case 'mv':
        fileMove(location, param1, param2);
        break;
      case 'rm':
        fileDelete(location, param1);
        break;
      case 'os':
        osInfo(param1);
        break;
      case 'hash':
        fileHash(location, param1);
        break;
      case 'compress':
        compress(location, param1, param2);
        break;
      case 'decompress':
        decompress(location, param1, param2);
        break;
      default:
        invalidInput();
    }
  } catch (err) {
    invalidInput();
  }
};

process.stdin.on('data', inputHandler);

process.on('SIGINT', () => {
  process.stdout.write(goodbye(user));
});

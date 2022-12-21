import { resolve } from 'node:path';
import process from 'node:process';
import { compress, decompress } from './compression.js';
import { dirList, dirOpen, dirUp } from './directories.js';
import { fileAdd, fileCat, fileCopy, fileDelete, fileMove, fileRename } from './files.js';
import { fileHash } from './hash.js';
import { currentLocation, goodbye, greeting, root } from './messages.js';
import { osInfo } from './os.js';

const user = process.argv[4].slice(7);

greeting(user);

let location = root;

const inputHandler = (chunk: Buffer) => {
  const [command, param1, param2] = chunk.toString().trim().split(' ');

  switch (command) {
    case '.exit':
      process.exit(0);
      break;
    case 'up':
      location = dirUp(location);
      break;
    case 'cd':
      if (param1) location = dirOpen(location, param1);
      break;
    case 'ls':
      dirList(location);
      break;
    case 'cat':
      fileCat(resolve(location, param1));
      break;
    case 'add':
      fileAdd(resolve(location, param1));
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
      fileDelete(resolve(location, param1));
      break;
    case 'os':
      osInfo(param1);
      break;
    case 'hash':
      fileHash(resolve(location, param1));
      break;
    case 'compress':
      compress(resolve(location, param1), resolve(location, param2));
      break;
    case 'decompress':
      decompress(resolve(location, param1), resolve(location, param2));
      break;
    default:
      process.stdout.write(command);
  }
};

process.stdin.on('data', inputHandler);
process.stdin.on('data', () => currentLocation(location));

process.on('SIGINT', () => {
  process.stdout.write(goodbye(user));
});

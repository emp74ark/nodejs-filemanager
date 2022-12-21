import process from 'node:process';
import { goodbye, greeting, root, currentLocation } from './messages.js';
import { dirUp, dirOpen, dirList } from './directories.js';

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
    default:
      process.stdout.write(command);
  }
};

process.stdin.on('data', inputHandler);
process.stdin.on('data', () => currentLocation(location));

process.on('SIGINT', () => {
  process.stdout.write(goodbye(user));
});

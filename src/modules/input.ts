import process from 'node:process';
import { goodbye, greeting, root } from './messages.js';
import {open} from 'node:fs'

const user = process.argv[4].slice(7);

greeting(user);

const inputHandler = (chunk: Buffer) => {
  const location = root;
  const command = chunk.toString();

  switch(command.trim()) {
    case '.exit':
      process.exit(0);
      break;
    default:
      process.stdout.write(command + '\n' + `You are currently in ${location}` + '\n');
  }
};

process.stdin.on('data', inputHandler);

process.on('SIGINT', () => {
  process.stdout.write(goodbye(user));
});

import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import {statSync} from 'node:fs'
import chalk from 'chalk';
import { currentLocation, home } from './messages.js';

export const dirUp = (to: string) => {
  const newPath = resolve(to, '..');
  if (to === home) {
    console.log(chalk.blue('Operation is not allowed'))
    return to
  }
  currentLocation(newPath)
  return newPath;
};

export const dirOpen = (from: string, to: string) => {
  const newPath = resolve(from, to);
  currentLocation(newPath)
  return newPath;
};

export const dirList = async (dir: string) => {
  const files = await readdir(dir);
  console.log(chalk.blue('type\t\t |\t name'))
  for (const file of files) {
    if (statSync(resolve(dir, file)).isFile()) console.log('file:\t\t |\t' + file);
    if (statSync(resolve(dir, file)).isDirectory()) console.log('directory:\t |\t' + file);
  }
  currentLocation(dir)
};

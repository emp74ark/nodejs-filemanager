import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

export const dirUp = (to: string) => {
  const newPath = resolve(to, '..');
  return newPath;
};

export const dirOpen = (from: string, to: string) => {
  const newPath = resolve(from, to);
  return newPath;
};

export const dirList = async (dir: string) => {
  const files = await readdir(dir);
  for (const file of files) {
    process.stdout.write(file + '\n');
  }
};

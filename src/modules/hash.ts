import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { currentLocation, invalidInput } from './messages.js';

export const fileHash = async (location: string, file: string) => {
  try {
    const data = await readFile(resolve(location, file));
    const hex = await createHash('sha256').update(data).digest('hex');
    console.log(hex + '\n');
  } catch (err) {
    invalidInput();
  } finally {
    currentLocation(location);
  }
};

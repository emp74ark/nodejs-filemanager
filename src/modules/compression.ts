import { createReadStream, createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { pipeline } from 'node:stream';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { currentLocation, invalidInput } from './messages.js';

export const compress = async (location: string, from: string, to: string) => {
  try {
    const rs = await createReadStream(resolve(location, from));
    const ws = await createWriteStream(resolve(location, to));
    const brotli = createBrotliCompress();
    pipeline(rs, brotli, ws, (err) => {
      if (err) throw new Error();
    });
  } catch (err) {
    invalidInput();
  } finally {
    currentLocation(location);
  }
};

export const decompress = async (location: string, from: string, to: string) => {
  try {
    const rs = await createReadStream(resolve(location, from));
    const ws = await createWriteStream(resolve(location, to));
    const brotli = createBrotliDecompress();
    pipeline(rs, brotli, ws, (err) => {
      if (err) throw new Error();
    });
  } catch (err) {
    invalidInput;
  } finally {
    currentLocation(location);
  }
};

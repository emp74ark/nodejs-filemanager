import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';

export const compress = async (from: string, to: string) => {
  const rs = await createReadStream(from);
  const ws = await createWriteStream(to);
  const brotli = createBrotliCompress();
  pipeline(rs, brotli, ws, (err) => {
    if (err) throw new Error();
  });
};

export const decompress = async (from: string, to: string) => {
  const rs = await createReadStream(from);
  const ws = await createWriteStream(to);
  const brotli = createBrotliDecompress();
  pipeline(rs, brotli, ws, (err) => {
    if (err) throw new Error();
  });
};

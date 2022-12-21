import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

export const fileHash = async (file: string) => {
  const data = await readFile(file);
  const hex = await createHash('sha256').update(data).digest('hex');
  console.log(hex + '\n');
};

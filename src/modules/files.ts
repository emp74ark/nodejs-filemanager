import { cp, createReadStream, rename, rm, writeFile } from 'node:fs';
import { parse, resolve } from 'node:path';

export const fileCat = (file: string) => {
  const rs = createReadStream(file);
  rs.on('data', (data) => process.stdout.write(data + '\n'));
};

export const fileAdd = (file: string) => {
  writeFile(file, '', (err) => {
    if (err) throw new Error();
  });
};

export const fileRename = (location: string, from: string, to: string) => {
  rename(resolve(location, from), resolve(location, to), (err) => {
    if (err) throw new Error();
  });
};

export const fileCopy = (location: string, from: string, to: string) => {
  cp(resolve(location, from), resolve(location, to), (err) => {
    if (err) throw new Error();
  });
};

export const fileMove = (location: string, from: string, to: string) => {
  const fileName = parse(from).base;
  cp(resolve(location, from), resolve(location, to, fileName), (err) => {
    if (err) throw new Error();
    fileDelete(resolve(location, from));
  });
};

export const fileDelete = (file: string) => {
  rm(file, (err) => {
    if (err) throw new Error();
  });
};

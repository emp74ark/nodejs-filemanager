import { cp, createReadStream, rename, rm, writeFile } from 'node:fs';
import { parse, resolve } from 'node:path';
import { currentLocation, invalidInput } from './messages.js';

export const fileCat = (location: string, file: string) => {
  const rs = createReadStream(resolve(location, file), 'utf8');
  rs.on('data', (data) => {
    console.log(data);
    currentLocation(location);
  });
  rs.on('error', () => invalidInput());
};

export const fileAdd = (location: string, file: string) => {
  writeFile(resolve(location, file), '', (err) => {
    if (err) invalidInput();
    currentLocation(location);
  });
};

export const fileRename = (location: string, from: string, to: string) => {
  rename(resolve(location, from), resolve(location, to), (err) => {
    if (err) invalidInput();
    currentLocation(location);
  });
};

export const fileCopy = (location: string, from: string, to: string) => {
  cp(resolve(location, from), resolve(location, to), (err) => {
    if (err) invalidInput();
    currentLocation(location);
  });
};

export const fileMove = (location: string, from: string, to: string) => {
  const fileName = parse(from).base;
  cp(resolve(location, from), resolve(location, to, fileName), (err) => {
    if (err) invalidInput();
    fileDelete(location, from);
    currentLocation(location);
  });
};

export const fileDelete = (location: string, file: string) => {
  rm(resolve(location, file), (err) => {
    if (err) invalidInput();
    currentLocation(location);
  });
};

import chalk from 'chalk';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const home = homedir();
export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const greeting = (user: string) => {
  console.log(chalk.bgMagenta(`Welcome to the File Manager, ${user}!`));
  console.log(chalk.yellow(`You are currently in ${root}`))
};
export const goodbye = (user: string) => chalk.bgBlue('\n' + `Thank you for using File Manager, ${user}, goodbye!`);
export const invalid = chalk.bgRed('Invalid input');

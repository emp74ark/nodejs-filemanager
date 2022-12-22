import chalk from 'chalk';
import { homedir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const home = homedir();

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

export const goodbye = (user: string) => chalk.bgBlue('\n' + `Thank you for using File Manager, ${user}, goodbye!`);

export const invalidInput = () => {
  console.log(chalk.bgRed('Invalid input'));
};

export const invalidSyntax = (command: string) => {
  console.log(chalk.bgRed(`Invalid command, use following syntax: ${command}`));
};

export const currentLocation = (location: string) => {
  console.log(chalk.yellow(`You are currently in ${location}`));
  console.log(chalk.green('Type command'));
};

export const greeting = (user: string) => {
  console.log(chalk.bgMagenta(`Welcome to the File Manager, ${user}!`));
  currentLocation(home);
};

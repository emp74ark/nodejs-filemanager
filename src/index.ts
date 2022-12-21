import { fork } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

const userPrompt = async (args: string[]) => {
  fork(resolve(root, 'modules', 'input'), args);
};

userPrompt(process.argv);

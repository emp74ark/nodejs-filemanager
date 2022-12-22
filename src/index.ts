import { fork } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { invalidSyntax } from './modules/messages.js';

const root = dirname(fileURLToPath(import.meta.url));

const userPrompt = async (args: string[]) => {
  try {
    if (args.length < 3) throw new SyntaxError();
    fork(resolve(root, 'modules', 'input'), args);
  } catch (err) {
    if (err instanceof SyntaxError) {
      invalidSyntax('npm run start -- --username=your_username');
    }
    console.error(err);
  }
};

userPrompt(process.argv);

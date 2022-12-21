import {EOL, cpus, homedir, userInfo, arch} from 'node:os'

export const osInfo = (param: string) => {
  switch (param) {
    case '--EOL':
      console.log(EOL.split(''));
      break;
    case '--cpus':
      console.log(cpus());
      break;
    case '--homedir':
      console.log(homedir())
      break;
    case '--username':
      console.log(userInfo().username);
      break;
    case '--architecture':
      console.log(arch())
      break;
  }
}
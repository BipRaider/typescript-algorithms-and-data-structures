type ColorLog = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export default class Logger {
  constructor(public name?: string) {}
  log(type: ColorLog = 2, ...message: any) {
    if (this.name) console.log(`\x1b[3${type}m%s\x1b[0m`, `[${this.name}] :`, `\x1b[3${type + 1}m`, message);
    else console.log(`\x1b[3${type}m%s\x1b[0m`, message);
  }
}
export const colorize = (...args: any) => ({
  black: `\x1b[30m${args.join(' ')}\x1b[0m`,
  red: `\x1b[31m${args.join(' ')}\x1b[0m`,
  green: `\x1b[32m${args.join(' ')}\x1b[0m`,
  yellow: `\x1b[33m${args.join(' ')}\x1b[0m`,
  blue: `\x1b[34m${args.join(' ')}\x1b[0m`,
  magenta: `\x1b[35m${args.join(' ')}\x1b[0m`,
  cyan: `\x1b[36m${args.join(' ')}\x1b[0m`,
  white: `\x1b[37m${args.join(' ')}\x1b[0m`,
  bgBlack: `\x1b[40m${args.join(' ')}\x1b[0m`,
  bgRed: `\x1b[41m${args.join(' ')}\x1b[0m`,
  bgGreen: `\x1b[42m${args.join(' ')}\x1b[0m`,
  bgYellow: `\x1b[43m${args.join(' ')}\x1b[0m`,
  bgBlue: `\x1b[44m${args.join(' ')}\x1b[0m`,
  bgMagenta: `\x1b[45m${args.join(' ')}\x1b[0m`,
  bgCyan: `\x1b[46m${args.join(' ')}\x1b[0m`,
  bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`,
});

export const col = {
  black: (...args: any) => `\x1b[40m${`\x1b[30m${args.join(' ')}`}\x1b[0m`,
  red: (...args: any) => `\x1b[41m${`\x1b[30m${args.join(' ')}`}\x1b[0m`,
  green: (...args: any) => `\x1b[42m${`\x1b[30m${args.join(' ')}`}\x1b[0m`,
  yellow: (...args: any) => `\x1b[43m${`\x1b[30m${args.join(' ')}`}\x1b[0m`,
  blue: (...args: any) => `\x1b[44m${`\x1b[30m${args.join(' ')}`}\x1b[0m`,
  magenta: (...args: any) => `\x1b[45m${`\x1b[30m${args.join(' ')}`}\x1b[0m`,
  cyan: (...args: any) => `\x1b[46m${`\x1b[30m${args.join(' ')}`}\x1b[0m`,
  white: (...args: any) => `\x1b[47m${`\x1b[30m${args.join(' ')}`}\x1b[0m`,
};

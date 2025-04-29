import { basename } from 'path';

export function process(sourcePath) {
  return {
    code: `module.exports = ${JSON.stringify(basename(sourcePath))};`,
  };
}

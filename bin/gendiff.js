#!/usr/bin/env node

import { Command } from 'commander';
import { genDiff } from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('CLI to some JavaScript string utilities')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .arguments('<file1> <file2>')
  .action((file1, file2) => {
    genDiff(file1, file2);
  });

program.parse();

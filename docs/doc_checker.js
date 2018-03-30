#!/usr/bin/env node

/** Small script to check to see if the exported functions of
 *  a file have docs.
 *
 */

const fs = require('fs');

const filename = process.argv[2];

const contents = fs.readFileSync(filename).toString();

const match_me = ' */';

let line_no = 0;
for (var i = 4, ii = contents.length; i < ii; i++) {
  if (contents.substring(i, i+1) === '\n') {
    line_no += 1;
  }

  // this line has an exported function or class
  if (contents.substring(i, i + 6) === 'export') {
    const next_space = contents.indexOf(' ', i + 7);
    const next_word = contents.substring(i + 7, next_space);
    if (contents.substring(i - 1, i - 4) !== match_me
        && ['function', 'class', 'default'].indexOf(next_word) >= 0) {

      const eol = contents.indexOf('\n', i);
      const line = contents.substring(i, eol);

      if (next_word === 'default' && line.indexOf('export default connect') < 0) {
        console.log('Missing docs:', filename, 'Line:', line_no, contents.substring(i, eol));
      }
    }
  }
}

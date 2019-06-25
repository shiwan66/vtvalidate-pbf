#!/usr/bin/env node

"use strict";

var exists = require('fs').existsSync;
var fs = require('fs');
var path = require('path');
var usage = 'usage:';
usage += '\n  node bin/vtvalidate.js <vector tile>';

var input_tile = path.join(__dirname, '/bigBuildings.json');
if (!input_tile) {
   console.log(usage);
   process.exit(1);
}

if (!exists(input_tile)) {
    console.log(input_tile + ' does not exist');
    process.exit(1);
}

var validator = require('../');
var buffer = fs.readFileSync(input_tile);

validator.isValid(buffer, function(err, valid) {
    if (err) {
        console.error(err.message);
        process.exit(1);
    }
    process.stdout.write(valid); // Using "if (valid)" here because vtvalidate returns "/n" for some reason
    process.exit(0);
});

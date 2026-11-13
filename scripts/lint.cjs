const { readdirSync, readFileSync } = require('node:fs');
const { join } = require('node:path');
const { execFileSync } = require('node:child_process');

function check(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) {
            check(path);
        } else if (entry.name.endsWith('.js') || entry.name.endsWith('.cjs')) {
            execFileSync(process.execPath, ['--check', '--input-type=' + (entry.name.endsWith('.cjs') ? 'commonjs' : 'module')], {
                input: readFileSync(path),
                stdio: ['pipe', 'inherit', 'inherit'],
            });
        }
    }
}

for (const directory of ['js', 'scripts', 'tests']) {
    check(directory);
}
execFileSync('bash', ['-n', 'publish.sh'], { stdio: 'inherit' });
JSON.parse(readFileSync('package.json', 'utf8'));
JSON.parse(readFileSync('.releaserc.yml', 'utf8'));
console.log('JavaScript, shell, and JSON syntax checks passed.');

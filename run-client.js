const process = require('child_process');

process.spawn('npm', ['start'], {
  stdio: 'inherit',
  cwd: 'client',
  shell: true,
});

import { spawn } from 'child_process';

const p = spawn('npm', ['run', 'payload:migrate:create', '--', 'seo_refactor_fix'], { shell: true, stdio: ['pipe', 'pipe', 'pipe'] });

p.stdout.on('data', data => process.stdout.write(data));
p.stderr.on('data', data => process.stderr.write(data));

setInterval(() => {
  p.stdin.write('\r');
}, 100);

p.on('close', code => {
  console.log(`Exited with code ${code}`);
  process.exit(code);
});

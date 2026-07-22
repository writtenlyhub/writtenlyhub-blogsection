async function main() {
  const res = await fetch('http://localhost:3000/');
  const html = await res.text();
  const matches = [...html.matchAll(/href="\/blog\/([^"]+)"/g)].map(m => m[1]);
  console.log('Homepage Slugs:', Array.from(new Set(matches)));
}

main().catch(console.error);

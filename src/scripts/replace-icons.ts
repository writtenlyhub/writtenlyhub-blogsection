import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

const iconMap: Record<string, string> = {
  'search': 'Search',
  'close': 'X',
  'menu': 'Menu',
  'history': 'History',
  'trending_up': 'TrendingUp',
  'keyboard_return': 'CornerDownLeft',
  'unfold_more': 'ChevronsUpDown',
  'format_quote': 'Quote',
  // generic fallback
};

function walk(dir: string, callback: (filepath: string) => void) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
      callback(filepath);
    }
  }
}

walk(SRC_DIR, (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  if (content.includes('material-symbols-outlined')) {
    // This is a naive replacement for the most common icons, it might require manual touch-ups
    // For now, let's just log it to see where they are to avoid breaking the codebase
    console.log(`Needs replacement: ${filepath}`);
  }
});

const fs = require('fs');
const path = require('path');

function replaceInFiles(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      replaceInFiles(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      let content = fs.readFileSync(p, 'utf8');
      let modified = false;
      
      // Look for imports from '@/data/mockBlogs'
      if (content.includes("from '@/data/mockBlogs'") || content.includes('from "@/data/mockBlogs"')) {
        content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]@\/data\/mockBlogs['"]/g, (match, imports) => {
          const newImports = imports.split(',').map(s => s.trim()).filter(s => s).map(i => {
            if (i.startsWith('type ')) i = i.replace('type ', '');
            if (i === 'Blog') return 'UI_Blog as Blog';
            if (i === 'Category') return 'UI_Category as Category';
            if (i === 'Author') return 'UI_Author as Author';
            return i;
          }).join(', ');
          
          return `import { ${newImports} } from '@/types/blog'`;
        });
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(p, content);
        console.log(`Updated ${p}`);
      }
    }
  });
}

replaceInFiles('./src');

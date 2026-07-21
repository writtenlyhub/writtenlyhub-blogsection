const fs = require('fs');
const files = [
  'src/scripts/seed/categories.ts',
  'src/scripts/seed/media.ts',
  'src/scripts/seed/tags.ts',
  'src/scripts/seed/users.ts',
  'src/scripts/seed/posts.ts',
  'src/scripts/seed/siteSettings.ts',
  'src/scripts/seed/index.ts'
];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/Record<string, string>/g, 'Record<string, number>');
  content = content.replace(/role: 'admin'/g, 'role: "admin" as const');
  content = content.replace(/role: 'author'/g, 'role: "author" as const');
  
  // also fix the siteSettings type errors for media relations
  content = content.replace(/mediaIds\['avatar-1\.svg'\]/g, 'mediaIds[\'avatar-1.svg\'] as any');
  content = content.replace(/mediaIds\['avatar-2\.svg'\]/g, 'mediaIds[\'avatar-2.svg\'] as any');
  content = content.replace(/mediaIds\['cover-1\.svg'\]/g, 'mediaIds[\'cover-1.svg\'] as any');
  
  // fix users.ts mediaIds
  content = content.replace(/avatar: mediaIds\[avatar\]/g, 'avatar: mediaIds[avatar] as any');
  
  // fix posts.ts users/categories/media etc
  content = content.replace(/author: userIds\[post.authorEmail\]/g, 'author: userIds[post.authorEmail] as any');
  content = content.replace(/category: categoryIds\[post.categorySlug\]/g, 'category: categoryIds[post.categorySlug] as any');
  content = content.replace(/featuredImage: mediaIds\['cover-1\.svg'\]/g, 'featuredImage: mediaIds[\'cover-1.svg\'] as any');

  fs.writeFileSync(file, content);
});
console.log('Fixed types in seed files');

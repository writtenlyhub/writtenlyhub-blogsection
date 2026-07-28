import fs from 'fs'

fetch('http://localhost:3000/blog/roi-video-marketing-b2b')
  .then(r => r.text())
  .then(html => { 
    console.log('canonical', html.includes('rel="canonical"'));
    console.log('hreflang', html.includes('hreflang="en"'));
    console.log('alternate', html.includes('rel="alternate"'));
    
    // print the actual link tags
    const links = html.match(/<link[^>]+>/g) || [];
    console.log('Link tags:', links.join('\n'));
  });

import { JSDOM } from 'jsdom';

const BASE_URL = 'http://localhost:3000';
const IGNORED_PATHS = ['#', 'mailto:', 'tel:'];

async function checkLink(url: string, originText: string): Promise<string | null> {
  // Skip ignored prefixes
  if (IGNORED_PATHS.some(prefix => url.startsWith(prefix))) {
    // We are deliberately leaving About, Services, Case Studies, Career, Write For Us, Terms, Privacy, etc. as # since they are out of scope.
    const allowedPlaceholders = [
      'About', 'Services', 'Case Studies', 'Career', 'Write For Us', 
      'Terms and Conditions', 'Return Policy', 'Privacy Policy', 'About Us', 'Contact',
      'SEO Content Writing', 'Social Media Marketing', 'Automate Your Digital Growth',
      'Content Writing', 'Content Writing Services in Bangalore', 'SMM Services in Bangalore'
    ];
    if (url === '#' && allowedPlaceholders.includes(originText.trim())) {
      return null; // Known pending page, ignored as per instructions
    }
    if (url === '#' && !allowedPlaceholders.includes(originText.trim())) {
       return `⚠️ WARNING: Link '${originText}' points to '#' but is not on the allowed placeholder list!`;
    }
    return null; // valid ignored (like mailto:)
  }

  const absoluteUrl = url.startsWith('/') ? `${BASE_URL}${url}` : url;
  
  if (!absoluteUrl.startsWith(BASE_URL)) {
    return null; // skip external links
  }

  try {
    const response = await fetch(absoluteUrl, { method: 'HEAD' });
    if (!response.ok) {
      return `❌ BROKEN LINK: ${absoluteUrl} returned ${response.status} (Text: "${originText.trim()}")`;
    }
    return null;
  } catch (error) {
    return `❌ BROKEN LINK: ${absoluteUrl} failed to fetch. (Text: "${originText.trim()}")`;
  }
}

async function auditLinks() {
  console.log(`Auditing links on ${BASE_URL}...`);
  try {
    const html = await fetch(BASE_URL).then(res => res.text());
    const dom = new JSDOM(html);
    const links = Array.from(dom.window.document.querySelectorAll('a'));
    
    console.log(`Found ${links.length} anchor tags.`);
    const results = [];
    
    for (const link of links) {
      const href = link.getAttribute('href');
      if (!href) continue;
      
      const error = await checkLink(href, link.textContent || '');
      if (error) results.push(error);
    }
    
    if (results.length === 0) {
      console.log('✅ All internal links are functional! No 404s found.');
    } else {
      console.log('Issues found:');
      results.forEach(res => console.log(res));
    }
  } catch (error) {
    console.error('Failed to run audit:', error);
  }
}

auditLinks();

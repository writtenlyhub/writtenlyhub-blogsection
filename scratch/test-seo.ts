import * as fs from 'fs';
import { calculateUnifiedScore } from '../src/lib/seo/analysis/unifiedScore';
import { ANALYSIS_CONFIG } from '../src/lib/seo/analysis/config';
import { DocumentState } from '../src/lib/seo/analysis/types';

// Mock lexical node generator
function createTextNode(text: string) {
  return { type: 'text', text };
}

function createParagraph(text: string) {
  return {
    type: 'paragraph',
    children: [createTextNode(text)]
  };
}

function createHeading(tag: string, text: string) {
  return {
    type: 'heading',
    tag,
    children: [createTextNode(text)]
  };
}

function createList(items: string[]) {
  return {
    type: 'list',
    children: items.map(text => ({
      type: 'listitem',
      children: [createTextNode(text)]
    }))
  };
}

function createQuote(text: string) {
  return {
    type: 'quote',
    children: [createTextNode(text)]
  };
}

function createLexicalRoot(children: any[]) {
  return {
    root: {
      children
    }
  };
}

const tests: any[] = [];

function runTest(category: string, rule: string, name: string, doc: Partial<DocumentState>, expectedStatus: string) {
  const defaultDoc: DocumentState = {
    title: 'Default Title',
    lexicalState: createLexicalRoot([createParagraph('This is a default paragraph. '.repeat(50))]) // Ensure > 300 words
  };
  
  const mergedDoc = { ...defaultDoc, ...doc };
  const summary = calculateUnifiedScore(mergedDoc, ANALYSIS_CONFIG);
  
  // Find the relevant rule
  const allResults = [...summary.seoResults, ...summary.readabilityResults];
  const ruleResult = allResults.find(r => r.id === rule);
  
  const actualStatus = ruleResult ? ruleResult.status : 'missing_rule';
  const message = ruleResult ? ruleResult.message : 'Rule not found';
  const score = summary.overallScore;
  
  tests.push({
    category,
    rule,
    name,
    expectedStatus,
    actualStatus,
    passed: expectedStatus === actualStatus,
    message,
    overallScore: score,
    input: doc
  });
}

// ----------------------------------------------------
// REGRESSION SUITE
// ----------------------------------------------------

// 1. Meta Description
runTest('SEO', 'meta-missing', 'Meta description missing', { metaDescription: '' }, 'fail');
runTest('SEO', 'meta-too-short', 'Meta description very short', { metaDescription: 'Short.' }, 'warning');
runTest('SEO', 'meta-optimal', 'Meta description exactly min', { metaDescription: 'a'.repeat(120) }, 'pass');
runTest('SEO', 'meta-optimal', 'Meta description exactly max', { metaDescription: 'a'.repeat(160) }, 'pass');
runTest('SEO', 'meta-too-long', 'Meta description extremely long', { metaDescription: 'a'.repeat(200) }, 'warning');

// 2. Title Length
runTest('SEO', 'title-missing', 'Title missing', { title: '', metaTitle: '' }, 'fail');
runTest('SEO', 'title-too-short', 'Title very short', { metaTitle: 'Short' }, 'warning');
runTest('SEO', 'title-optimal', 'Title optimal length', { metaTitle: 'a'.repeat(55) }, 'pass');
runTest('SEO', 'title-too-long', 'Title extremely long', { metaTitle: 'a'.repeat(100) }, 'warning');

// 3. Keyword in Title
runTest('SEO', 'keyword-title-missing-keyword', 'Keyword missing entirely', { focusKeyword: '' }, 'fail');
runTest('SEO', 'keyword-title-pass', 'Keyword present in title', { focusKeyword: 'test', metaTitle: 'This is a test title' }, 'pass');
runTest('SEO', 'keyword-title-fail', 'Keyword missing from title', { focusKeyword: 'apple', metaTitle: 'This is a test title' }, 'fail');

// 4. Keyword in Content
runTest('SEO', 'keyword-content-pass', 'Keyword in first paragraph', { 
  focusKeyword: 'test', 
  lexicalState: createLexicalRoot([
    { type: 'image' },
    createHeading('h2', 'Heading 1'),
    createParagraph('This test is in the first paragraph.')
  ]) 
}, 'pass');
runTest('SEO', 'keyword-content-warn', 'Keyword late in content', { 
  focusKeyword: 'test', 
  lexicalState: createLexicalRoot([
    createParagraph('a'.repeat(400)), // push past 300 chars
    createParagraph('Here is the test keyword.')
  ]) 
}, 'warning');
runTest('SEO', 'keyword-content-fail', 'Keyword missing in content', { 
  focusKeyword: 'apple', 
  lexicalState: createLexicalRoot([
    createParagraph('No keyword here.')
  ]) 
}, 'fail');

// 5. Word Count
runTest('SEO', 'word-count-empty', 'Empty content', { lexicalState: createLexicalRoot([]) }, 'fail');
runTest('SEO', 'word-count-low', 'Low word count', { lexicalState: createLexicalRoot([createParagraph('Hello world')]) }, 'warning');
runTest('SEO', 'word-count-optimal', 'Optimal word count', { lexicalState: createLexicalRoot([createParagraph('word '.repeat(350))]) }, 'pass');

// Readability: Paragraph Length
runTest('Readability', 'readability-paragraphs', 'Long paragraph', { 
  lexicalState: createLexicalRoot([createParagraph('word '.repeat(200))]) 
}, 'warning');
runTest('Readability', 'readability-paragraphs', 'Normal paragraphs', { 
  lexicalState: createLexicalRoot([createParagraph('word '.repeat(100))]) 
}, 'pass');

// Readability: Sentence Length
runTest('Readability', 'readability-sentences', 'Long sentences', { 
  lexicalState: createLexicalRoot([createParagraph('This is a very long sentence that just keeps going and going and never seems to end because there is no punctuation anywhere in sight until the very end. '.repeat(5))]) 
}, 'warning');

// Readability: Single Sentence Paragraphs
runTest('Readability', 'readability-single-sentence', 'Short single sentence paragraphs', { 
  lexicalState: createLexicalRoot([
    createParagraph('One sentence.'),
    createParagraph('Another one.'),
    createParagraph('And third.'),
    createParagraph('And fourth.')
  ]) 
}, 'warning');
runTest('Readability', 'readability-single-sentence', 'Heading is not a paragraph', { 
  lexicalState: createLexicalRoot([
    createHeading('h2', 'One sentence.'),
    createHeading('h2', 'Another one.'),
    createHeading('h2', 'And third.'),
    createHeading('h2', 'And fourth.')
  ]) 
}, 'pass');

// Readability: Empty Headings
runTest('Readability', 'readability-empty-headings', 'Empty heading', { 
  lexicalState: createLexicalRoot([createHeading('h2', '  ')]) 
}, 'fail');

// Readability: Consecutive Headings
runTest('Readability', 'readability-consecutive-headings', 'Consecutive headings', { 
  lexicalState: createLexicalRoot([createHeading('h2', 'Heading 1'), createHeading('h3', 'Heading 2')]) 
}, 'warning');

// Readability: Hierarchy
runTest('Readability', 'readability-hierarchy', 'Broken hierarchy', { 
  lexicalState: createLexicalRoot([createHeading('h2', 'H2'), createParagraph('text'), createHeading('h4', 'H4')]) 
}, 'warning');

// Multiple H1 check
runTest('Readability', 'readability-multiple-h1', '0 H1', { 
  lexicalState: createLexicalRoot([createHeading('h2', 'H2')]) 
}, 'pass');
runTest('Readability', 'readability-multiple-h1', '1 H1', { 
  lexicalState: createLexicalRoot([createHeading('h1', 'H1')]) 
}, 'pass');
runTest('Readability', 'readability-multiple-h1', '2 H1', { 
  lexicalState: createLexicalRoot([createHeading('h1', 'H1'), createHeading('h1', 'H1')]) 
}, 'fail');
runTest('Readability', 'readability-multiple-h1', '3 H1', { 
  lexicalState: createLexicalRoot([createHeading('h1', 'H1'), createHeading('h1', 'H1'), createHeading('h1', 'H1')]) 
}, 'fail');

// Readability: Transition words
runTest('Readability', 'readability-transitions', 'Therefore transition', { 
  lexicalState: createLexicalRoot([createParagraph('Therefore, we pass.')]) 
}, 'pass');
runTest('Readability', 'readability-transitions', 'Furthermore transition', { 
  lexicalState: createLexicalRoot([createParagraph('Furthermore, this is excellent.')]) 
}, 'pass');
runTest('Readability', 'readability-transitions', 'As a result transition', { 
  lexicalState: createLexicalRoot([createParagraph('As a result, this is good.')]) 
}, 'pass');
runTest('Readability', 'readability-transitions', 'However transition', { 
  lexicalState: createLexicalRoot([createParagraph('However, this is good.')]) 
}, 'pass');
runTest('Readability', 'readability-transitions', 'No transitions with generic words', { 
  lexicalState: createLexicalRoot([createParagraph('This has no transition. It is just a sentence. Another sentence here. The result is here. Thereforeology should not match.')]) 
}, 'warning');


// ----------------------------------------------------
// SCORING MODEL TESTS
// ----------------------------------------------------
const testA = calculateUnifiedScore({
  title: 'Perfect SEO Title with keyword long enough to pass.',
  metaTitle: 'Perfect SEO Title with keyword long enough to pass.',
  metaDescription: 'This is a perfect meta description that is long enough to pass all the checks and includes everything perfectly. It needs to be over 120 characters to pass.',
  focusKeyword: 'keyword',
  canonicalUrl: 'https://test.com',
  featuredImage: 'image.jpg',
  lexicalState: createLexicalRoot([
    createHeading('h1', 'Perfect Keyword Content'),
    createParagraph('Keyword is right here early. As a result, we have a transition. Short sentence. Another short sentence. This is very good.'),
    { type: 'upload', relationTo: 'media', fields: { alt: 'alt text' } },
    {
      type: 'link',
      fields: { url: '/blog/test' },
      children: [createTextNode('internal link')]
    },
    createParagraph('More text here. Therefore, this is awesome. We love writing code. It is fun. '.repeat(9)),
    createHeading('h2', 'Yet another section'),
    createParagraph('Even more text here to boost word count. As an illustration, we can write a lot. Here is some more. '.repeat(7)),
    createHeading('h2', 'Final section'),
    createParagraph('And this is the final paragraph. It needs to be fairly long. '.repeat(9))
  ])
}, ANALYSIS_CONFIG);

console.log('Test A Breakdown:');
console.log(testA.seoResults.map(r => `${r.id}: ${r.status} (${r.weight})`).join('\n'));
console.log(testA.readabilityResults.map(r => `${r.id}: ${r.status} (${r.weight})`).join('\n'));

const testE = calculateUnifiedScore({
  title: '',
  metaTitle: '',
  metaDescription: '',
  focusKeyword: '',
  canonicalUrl: 'invalid_url', // to fail canonical
  lexicalState: createLexicalRoot([])
}, ANALYSIS_CONFIG);

console.log('Test E Breakdown:');
console.log(testE.seoResults.map(r => `${r.id}: ${r.status} (${r.weight})`).join('\n'));
console.log(testE.readabilityResults.map(r => `${r.id}: ${r.status} (${r.weight})`).join('\n'));

tests.push({ category: 'Score Test', name: 'Excellent Content', score: testA.overallScore });
tests.push({ category: 'Score Test', name: 'Awful Content', score: testE.overallScore });

// Validate ranges
if (testA.overallScore < 95 || testA.overallScore > 100) {
  console.error('ERROR: Excellent Content score out of range: ' + testA.overallScore);
}
if (testE.overallScore > 5) {
  console.error('ERROR: Awful Content score too high: ' + testE.overallScore);
}

// Write results
fs.writeFileSync('seo-plugin-audit.json', JSON.stringify(tests, null, 2));
console.log('Tests finished, wrote seo-plugin-audit.json');

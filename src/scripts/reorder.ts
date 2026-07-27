import configPromise from '../payload.config';
import { getPayload } from 'payload';

async function run() {
  const payload = await getPayload({ config: await configPromise });
  const result = await payload.find({
    collection: 'blogs',
    limit: 10,
    depth: 1
  });
  
  const blog = result.docs[0];
  console.log('Found blog:', blog.title);
  
  if (blog.content && blog.content.root && blog.content.root.children) {
    const children = blog.content.root.children;
    const conclusionIdx = children.findIndex((c: any) => c.type === 'heading' && c.children?.some((ch: any) => ch.text && ch.text.includes('Conclusion')));
    const faqIdx = children.findIndex((c: any) => c.type === 'block' && c.fields?.blockType === 'faq');
    const ctaIdx = children.findIndex((c: any) => c.type === 'block' && c.fields?.blockType === 'cta');
    
    console.log('Indices:', { conclusionIdx, faqIdx, ctaIdx });
    
    if (conclusionIdx > -1 && faqIdx > -1 && ctaIdx > -1) {
       const faqBlock = children.splice(faqIdx, 1)[0];
       const ctaIdx2 = children.findIndex((c: any) => c.type === 'block' && c.fields?.blockType === 'cta');
       const ctaBlock = children.splice(ctaIdx2, 1)[0];
       
       const conclusionIdx3 = children.findIndex((c: any) => c.type === 'heading' && c.children?.some((ch: any) => ch.text && ch.text.includes('Conclusion')));
       children.splice(conclusionIdx3 + 1, 0, faqBlock);
       children.splice(conclusionIdx3 + 2, 0, ctaBlock);
       
       await payload.update({
         collection: 'blogs',
         id: blog.id,
         data: {
           content: blog.content
         }
       });
       console.log('Successfully reordered and saved blog post!');
    } else {
       console.log('Missing some blocks, skipping reorder');
    }
  }
  process.exit(0);
}
run().catch(console.error);

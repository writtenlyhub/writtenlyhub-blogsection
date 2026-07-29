import payload from 'payload';
import configPromise from '../../payload.config';
import { createBlock } from './lexical';

const run = async () => {
  await payload.init({
    config: configPromise,
  });

  const blogs = await payload.find({ collection: 'blogs', limit: 5 });
  
  if (blogs.docs.length > 0) {
    for (const [index, blog] of blogs.docs.entries()) {
      const content = blog.content;
      
      // We will alternate between Pie, Line, and Bar
      const chartTypes = ['pie', 'line', 'bar'];
      const chartType = chartTypes[index % 3];

      const graphBlock = createBlock('dataGraph', {
        title: `Interactive ${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart Example`,
        chartType: chartType,
        xAxisLabel: 'Month',
        yAxisLabel: 'Metric',
        dataPoints: [
          { label: 'Jan', value: Math.floor(Math.random() * 500) + 100 },
          { label: 'Feb', value: Math.floor(Math.random() * 500) + 100 },
          { label: 'Mar', value: Math.floor(Math.random() * 500) + 100 },
          { label: 'Apr', value: Math.floor(Math.random() * 500) + 100 },
          { label: 'May', value: Math.floor(Math.random() * 500) + 100 },
        ]
      });

      content.root.children.push(graphBlock);

      await payload.update({
        collection: 'blogs',
        id: blog.id,
        data: {
          content
        }
      });
      console.log(`Successfully injected ${chartType} graph into: ${blog.title}`);
    }
  } else {
    console.log('No blogs found to inject into.');
  }

  process.exit(0);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

import { MockContentNode, BlogDetailData } from '@/types/blog';

export const MOCK_DATA: BlogDetailData = {
  hero: {
    category: "Technology",
    title: "10 Ways Businesses Are Using AI to Save Time and Increase Revenue",
    summary: "AI is no longer a future concept, it is already reshaping how businesses operate and grow. From automating workflows to improving sales performance, companies are using AI to save time, reduce costs, and unlock new revenue opportunities.",
    author: {
      name: "Ethan Walker",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5ZUQMTWFkNUbFeOeVKIZsG5c220VSZ6aPNJjtDeCfJypJUifUnvRgy7YsYM92THFxc86W5Nb8MlC1DClh6oPdHcskFW6jHLIYHeqoOOrOeToHH-KHCvDlDnpl-QYLcCPTAiIZkveR9aRIWx83PRkwLoVibxEYsfArOKuAjf7Zkhz8oaIDotn0Pmv780vR_6HmyInzjZMp4nng5iugVQEkPQFf3CNLA85MJPHO0OOlDIvpIbw9IS430Arx8TcAl16Xal42y2gteCY"
    },
    publishedAt: "Jun 10, 2024",
    updatedAt: "Jun 12, 2024",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
    imageAlt: "A high-resolution conceptual 3D render illustrating artificial intelligence and data."
  },
  toc: [
    { id: "heading-0", title: "Overview", level: 3 },
    { id: "heading-1", title: "Quick Facts", level: 3 },
    { id: "section1", title: "1. Automating Customer Support Responses", level: 2 },
    { id: "section2", title: "2. Enhancing Sales Lead Qualification", level: 2 },
    { id: "heading-4", title: "Need help creating SEO-focused content?", level: 3 },
    { id: "section3", title: "3. Personalizing Marketing Campaigns", level: 2 },
    { id: "heading-6", title: "Key Takeaways", level: 3 },
    { id: "conclusion", title: "Conclusion", level: 2 }
  ],
  contentBlocks: {
    intro: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Artificial intelligence is rapidly moving from experimental technology to a core part of modern business operations across nearly every industry. Companies are no longer adopting AI just to experiment or signal innovation, but to improve efficiency, reduce operational friction, and increase revenue in measurable and repeatable ways.' }]
      },
      {
        type: 'paragraph',
        children: [
          { type: 'text', text: 'The impact of AI is not limited to large tech firms with advanced engineering teams and complex infrastructure. Small and mid-sized businesses are also using it to streamline operations, enhance customer experiences, and make faster decisions with fewer resources. ' },
          { type: 'link', url: '#', children: [{ type: 'text', text: 'This democratization of AI tools' }] },
          { type: 'text', text: ' has made advanced capabilities more accessible than ever before.' }
        ]
      }
    ] as MockContentNode[],
    section1: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'One of the most common ways businesses are using AI to save time and increase revenue is through customer support automation. AI-powered chat systems and virtual assistants can now handle a large percentage of customer inquiries without human intervention.' }]
      },
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'These systems can respond instantly to frequently asked questions, track orders, and guide users through basic troubleshooting steps. This improves response times significantly while reducing the need for large support teams to handle repetitive queries. It also ensures customers receive immediate assistance at any time of day.' }]
      }
    ] as MockContentNode[],
    section2: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'AI is also transforming how businesses manage and qualify leads, making sales processes more efficient and targeted. Instead of manually reviewing every potential customer, AI systems can analyze behavior, engagement patterns, and purchase signals to identify high-quality leads.' }]
      }
    ] as MockContentNode[],
    section2_afterImage: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'This allows sales teams to prioritize their efforts more effectively and focus on prospects with the highest likelihood of conversion. Instead of spending time on low-intent leads, they can concentrate on opportunities that are more likely to generate revenue. This improves both productivity and sales performance.' }]
      }
    ] as MockContentNode[],
    section3: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Marketing personalization has become significantly more advanced with the help of AI systems. Businesses are now using AI to analyze large volumes of customer data and deliver highly targeted campaigns based on behavior, preferences, and purchase history. This level of precision was not previously possible at scale.' }]
      },
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Instead of sending the same message to an entire audience, companies can now tailor content for different customer segments in real time. This increases engagement and improves conversion rates because messages feel more relevant to each user. It also strengthens brand connection.' }]
      }
    ] as MockContentNode[],
    conclusion: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'AI is no longer just a productivity tool, it is a strategic driver of business growth and operational transformation. From customer support and marketing to finance, forecasting, and retention, companies are using AI to save time and increase revenue across nearly every function. This impact is broad and accelerating.' }]
      },
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'The most successful businesses are not simply those that adopt AI, but those that integrate it thoughtfully into their workflows and decision systems. By doing so, they unlock efficiency, improve decision-making, and build scalable systems that support long-term growth. This creates durable advantages.' }]
      }
    ] as MockContentNode[],
  },
  quote: {
    quote: "The key shift is simple but significant. Businesses are no longer asking whether to use AI, but how to use it effectively to save time and increase revenue in practical and scalable ways.",
    label: "Expert Insight"
  },
  keyTakeaways: {
    title: "Key Takeaways",
    items: [
      "AI adoption is shifting from an experimental novelty to a foundational operational requirement for maintaining competitiveness.",
      "Customer support automation offers immediate ROI by handling repetitive queries, freeing human agents for complex issues.",
      "Predictive lead scoring significantly shortens sales cycles and improves conversion rates by focusing resources on high-intent prospects.",
      "Hyper-personalization in marketing is now achievable at scale, driving higher engagement and customer lifetime value."
    ]
  },
  inlineCTA: {
    title: "Need help creating SEO-focused content?",
    description: "Our experts use advanced AI tools combined with human creativity to scale your content marketing effectively.",
    buttonText: "Book a Strategy Call",
    buttonLink: "#"
  },
  aboutAuthor: {
    name: "Ethan Walker",
    role: "Senior Tech Editor",
    bio: "Ethan has over a decade of experience bridging the gap between complex technical concepts and actionable business strategies.",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5ZUQMTWFkNUbFeOeVKIZsG5c220VSZ6aPNJjtDeCfJypJUifUnvRgy7YsYM92THFxc86W5Nb8MlC1DClh6oPdHcskFW6jHLIYHeqoOOrOeToHH-KHCvDlDnpl-QYLcCPTAiIZkveR9aRIWx83PRkwLoVibxEYsfArOKuAjf7Zkhz8oaIDotn0Pmv780vR_6HmyInzjZMp4nng5iugVQEkPQFf3CNLA85MJPHO0OOlDIvpIbw9IS430Arx8TcAl16Xal42y2gteCY"
  },
  footerCTA: {
    title: "Ready to scale your content strategy?",
    description: "Join 500+ industry leaders driving growth through high-performance content with WrittenlyHub.",
    buttonText: "Book a Strategy Call",
    buttonLink: "#"
  },
  watchLearn: {
    title: "Watch & Learn",
    description: "Watch related AI, SEO, and content marketing videos on our channel.",
    buttonText: "Watch on YouTube",
    buttonLink: "#"
  },
  faqs: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Is AI replacing human writers completely?",
        answer: "No. AI is best used to augment human creativity, handle repetitive research tasks, and generate initial drafts. Human writers remain essential for strategic thinking, brand voice nuance, empathy, and deep subject matter expertise."
      },
      {
        question: "How much does it cost to implement AI in a small business?",
        answer: "Costs vary widely, but many powerful tools operate on accessible SaaS models starting at under $50/month. The key is starting small with targeted automation before investing in custom enterprise solutions."
      },
      {
        question: "What is the first step to adopting AI for content?",
        answer: "Begin by auditing your current workflow to identify bottlenecks (e.g., topic ideation, outlining, or SEO research). Introduce an AI tool specifically to solve that one bottleneck, measure the impact, and expand gradually."
      }
    ]
  },
  relatedArticles: [
    {
      title: "How Small Businesses Are Competing With Big Brands Using AI",
      summary: "AI tools are giving small businesses access to capabilities once reserved for large enterprises.",
      category: "AI Content",
      date: "May 5, 2024",
      readTime: "6 min read",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVZ430kSJmQ1hKtoH0W2_pcFc30ZK5Y95NxC506FUmOMz4aRlpm5JFn-TZEUZqOC28O_mW6anFIts33iqljXY2HkrvBNnJ81askCaXs2SPxl5QiJmHyEy2eHam69Dmj45PyzOvvxG3CF2DZS3mkB0pO35J1UIgHnZPNY20nyLLtOZGhZMs2hn7hu_y07c_7hWgd2vKHK4klKXEalP_ZtAy9i4TgfXp3fIpehaNjWTNxVsa6tQywzW6YCmPya5phaub0fJpfcM_sjc",
      link: "#"
    },
    {
      title: "Key Business Trends Smart Companies Are Preparing For",
      summary: "The business landscape is changing rapidly as technology, consumer behavior, and workplace expectations evolve.",
      category: "Business",
      date: "May 8, 2024",
      readTime: "5 min read",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHiK2o5c-F6bau2oew5sGa9WYY7fU4Ow41A_HMmaGENVVjzjlwCihkgOFsHEIkCGK42ya1p0EigJr5oco4tpTQKlOOHfFVofdXmY1gWVyhVRVHkafhhNBc9EqdtknOxO_bXr2K17XAYVCjQOpBR6s06m-nPqG3--hQPTN7w2NmslltIG6BBVJK4RItd8LghFeRrtylgZcDL3EgYq50LQDM2Or0fyGWn72txlJy6k_8t5L_yrXLEVugpq_6_Bs7BS9LijZoS4s_Khw",
      link: "#"
    },
    {
      title: "How Automation Is Replacing Repetitive Work Across Businesses",
      summary: "Automation is quietly transforming how businesses operate by removing repetitive tasks from human workloads.",
      category: "Technology",
      date: "May 12, 2024",
      readTime: "9 min read",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSIWqvbjTQpdXBGMh9MyZAHYrkVKgYTpVcD4ngh4SqRj8z6XDWA-MX1z14FdFQadBIEJdi5ea4EnjDJ7O5HZ8PJXROjrRpK46ZU0l6_ez08_zoevmBktn6rFdU0HzV2BNBCEkkEVkAfOghVeuZe7z7I0iKJyiLNAN19ePHkx-10k4ZJu5jzi0FCnguHp0HMJP5ZGR5PYblCyIBRSk5HQ05QlIW3PDBzZ-Q067JSvLXm7RebHlji_JtYt4lkgDYnmO3y71yOnCRnnQ",
      link: "#"
    }
  ]
};

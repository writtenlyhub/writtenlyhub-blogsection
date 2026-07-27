import {
  createParagraph,
  createHeading,
  createList,
  createBlock,
} from './lexical';

// A realistic, highly structured, 2500+ word article for testing editorial layouts.
export const realisticLongFormContent = [
  createParagraph('The digital landscape is undergoing a seismic shift. For over a decade, content marketing has relied on a predictable formula: research keywords, write a 1,500-word blog post, build some backlinks, and wait for the organic traffic to roll in. But as we move deeper into an era dominated by artificial intelligence, zero-click searches, and unprecedented content saturation, the old playbook is no longer just ineffective—it is obsolete.'),
  createParagraph('Today’s consumers are overwhelmed. They are bombarded with thousands of marketing messages every single day, leading to a phenomenon known as content fatigue. When every brand in your industry is publishing comprehensive guides, ultimate checklists, and thought leadership pieces, how do you stand out? The answer lies not in creating more content, but in creating profoundly better, more strategic, and highly personalized content experiences.'),
  createParagraph('In this comprehensive guide, we will explore the fundamental shifts reshaping digital content marketing. We will break down why traditional SEO is fracturing, how generative AI is changing user behavior, and what forward-thinking marketing teams are doing to capture attention and drive revenue in an increasingly noisy world. Whether you are a solo consultant, a SaaS startup, or an enterprise marketing director, the strategies outlined here will serve as your blueprint for the next decade of digital growth.'),
  
  createHeading('The Decline of the Traditional Search Era', 'h2'),
  createParagraph('For years, Google was the undisputed gatekeeper of the internet. If you wanted answers, you searched Google. If you wanted traffic, you optimized for Google. This mutually beneficial relationship fueled the rise of the content marketing industry. But the gatekeeper is evolving. With the introduction of AI Overviews, Search Generative Experience (SGE), and embedded answers, Google is increasingly trying to answer user queries directly on the search engine results page (SERP).'),
  createParagraph('This shift has led to a dramatic rise in zero-click searches. A zero-click search occurs when a user finds the answer to their query at the top of the search results without ever clicking through to a website. According to recent studies, nearly 60% of all Google searches now end without a click to a third-party site. For content marketers who rely heavily on organic traffic metrics, this is a terrifying statistic.'),
  createParagraph('However, this does not mean SEO is dead. It means the definition of SEO is changing. Instead of optimizing for generic, top-of-funnel queries that AI can answer in three sentences, marketers must pivot toward complex, nuanced, and opinion-driven queries that require human expertise, narrative, and deep analysis.'),
  
  createBlock('keyTakeaways', {
    title: 'Key Takeaways for the Post-Search Era',
    items: [
      { item: 'Zero-click searches are the new norm for informational queries; stop targeting questions that can be answered in a single sentence.' },
      { item: 'Focus on "Information Gain"—providing unique data, opinions, or insights that cannot be scraped or summarized by AI.' },
      { item: 'Brand authority and direct traffic will become the most valuable metrics as organic search traffic naturally declines.' },
      { item: 'Invest heavily in owned audiences (email newsletters, communities) to insulate your business from algorithmic volatility.' },
    ],
  }),

  createHeading('Embracing the AI Revolution: From Threat to Tool', 'h2'),
  createParagraph('When generative AI tools like ChatGPT, Claude, and Jasper first hit the mainstream, panic rippled through the content marketing community. Writers feared for their jobs, editors worried about a flood of generic content, and strategists questioned the future of their discipline. Fast forward to today, and the reality is far more nuanced. AI has not replaced elite content marketers; it has elevated them.'),
  createParagraph('The organizations winning today are those that treat AI as a co-pilot rather than an autopilot. They are not using AI to click a button and generate a 2,000-word blog post. Instead, they are using it to scale the operational aspects of content creation: outlining, brainstorming, analyzing datasets, formatting code snippets, and repurposing long-form content into social media assets.'),
  createParagraph('When everyone has access to the exact same AI tools, the baseline quality of content on the internet rises, but the ceiling remains unchanged. The competitive advantage no longer lies in the ability to produce grammatically correct text at scale. The advantage lies in original research, human storytelling, proprietary data, and contrarian perspectives—things that AI, by its very nature of predicting the next most likely word based on historical data, cannot generate.'),

  createBlock('expertInsight', {
    quote: 'If your entire content strategy can be replicated by a competitor typing a prompt into an LLM, you do not have a strategy. You have a vulnerability.',
    label: 'Elena V., VP of Marketing Strategies',
  }),

  createHeading('The 4 Pillars of a Future-Proof Content Strategy', 'h2'),
  createParagraph('If the old playbook is broken, what replaces it? Through our analysis of the fastest-growing B2B and B2C brands, we have identified four core pillars that define successful modern content marketing strategies. These pillars shift the focus away from algorithm manipulation and back toward genuine audience engagement.'),

  createHeading('Pillar 1: Original Research and Proprietary Data', 'h3'),
  createParagraph('The most valuable currency in modern content marketing is original data. Why? Because it is the one thing AI cannot hallucinate or synthesize from existing sources. When you publish original research—whether it is an industry survey, an analysis of user behavior on your platform, or a comprehensive benchmark report—you become the primary source.'),
  createParagraph('Original research naturally attracts backlinks, social shares, and media coverage because it introduces net-new information to the internet ecosystem. It positions your brand as an authority rather than just an aggregator. Furthermore, it creates a moat around your content that competitors cannot easily cross.'),
  
  createBlock('quickFacts', {
    title: 'The Power of Original Research',
    facts: [
      { fact: 'Articles containing original data receive 3x more backlinks than standard opinion pieces.' },
      { fact: '74% of B2B buyers say data-backed reports are the most influential content format during the purchasing process.' },
      { fact: 'Brands that publish annual state-of-the-industry reports see a 45% higher domain authority on average.' }
    ],
  }),

  createHeading('Pillar 2: Opinion-Driven Thought Leadership', 'h3'),
  createParagraph('For too long, brands have played it safe, publishing vanilla, middle-of-the-road content designed to appeal to everyone (and consequently, appealing to no one). In an era of infinite content, neutrality is a death sentence. To capture attention, your content must take a stance.'),
  createParagraph('Opinion-driven thought leadership requires putting a stake in the ground. It means having a distinct point of view about where your industry is heading, what your competitors are getting wrong, and what the future should look like. This type of content polarizes—it attracts your ideal customers intensely while repelling those who aren’t a fit. This is a feature, not a bug.'),

  createBlock('quote', {
    quote: 'The goal of content is not to get everyone to agree with you. The goal is to build a tribe of people who see the world exactly the way you do.',
    label: 'Industry Perspective',
  }),

  createHeading('Pillar 3: Multi-Format Content Ecosystems', 'h3'),
  createParagraph('The days of text-only blog posts dominating the internet are over. Consumer preferences have diversified, and your content strategy must reflect that. A future-proof strategy relies on a multi-format ecosystem where a single core idea is adapted for different mediums and consumption habits.'),
  createParagraph('For example, a comprehensive whitepaper should not just sit behind a lead capture form. It should be broken down into a 5-part podcast series, adapted into 15 short-form video clips for LinkedIn and TikTok, distilled into a high-impact infographic, and discussed in a live webinar.'),
  createList([
    'Start with a high-effort "Anchor Asset" (e.g., an original research report or book).',
    'Deconstruct the anchor asset into "Derivative Assets" (blog posts, videos, podcasts).',
    'Distribute derivative assets across platforms natively (do not just post links).',
    'Use analytics to identify which derivative assets perform best, and feed those insights back into your next anchor asset.'
  ]),

  createHeading('Pillar 4: Building Owned Communities', 'h3'),
  createParagraph('If there is one lesson marketers have learned over the past five years, it is the danger of building your house on rented land. Whether it is a sudden algorithm update on Google, a shift to a paid-play model on Facebook, or the unpredictable volatility of Twitter/X, relying on third-party platforms to reach your audience is a massive risk.'),
  createParagraph('The antidote is owned audience development. The most resilient brands are focusing heavily on direct relationships: email newsletters, private Slack/Discord communities, SMS subscriber lists, and proprietary event networks. When you own the relationship, you own the distribution channel. You no longer have to pay a toll or decipher an algorithm to speak to your best customers.'),

  createBlock('callout', {
    title: 'Strategic Advice',
    content: 'Treat your email newsletter as a product, not just a distribution channel. It should provide enough standalone value that people would gladly pay for it, even if you offer it for free.',
    type: 'pro-tip',
  }),

  createHeading('The Mechanics of Modern Distribution', 'h2'),
  createParagraph('Creating elite content is only half the battle; distributing it effectively is where most marketing teams fail. The old model of clicking "publish," sharing a link on social media, and sending a broadcast email is wholly insufficient for today’s algorithms. Modern platforms are designed to keep users on the platform. They actively suppress posts containing external links.'),
  createParagraph('To succeed in distribution today, you must master the art of "Zero-Click Distribution." This means delivering the core value of your content natively within the platform itself, without requiring the user to click away. If you write a 3,000-word blog post, your LinkedIn post should not just say "Read our new post here." It should summarize the three most important insights directly in the feed.'),
  createParagraph('Zero-click distribution builds trust. When you consistently provide value in the feed, users begin to associate your brand with high-quality insights. Eventually, when they need the deep dive or the full solution, they will actively seek out your website.'),

  createHeading('Integrating Video into the Content Mix', 'h3'),
  createParagraph('We cannot discuss modern content without addressing the explosive growth of video. From the dominance of YouTube in search to the meteoric rise of short-form vertical video, consumers are demanding visual, dynamic, and highly engaging formats.'),
  createParagraph('For many B2B brands, video remains an intimidating frontier. The perceived barriers to entry—expensive equipment, complex editing software, on-camera talent—keep them sidelined. But the reality is that authenticity has surpassed production value in importance. A well-lit, deeply insightful video shot on a smartphone will almost always outperform a highly polished, corporate video that lacks substance.'),

  createBlock('watchLearn', {
    title: 'Content Repurposing Masterclass',
    description: 'Learn how our team turns one 30-minute interview into 25 pieces of high-performing multi-channel content using our proprietary framework.',
    buttonText: 'Watch the Breakdown',
    buttonLink: 'https://youtube.com',
  }),

  createHeading('Metrics that Actually Matter', 'h2'),
  createParagraph('As strategy evolves, so too must the metrics we use to measure success. For a decade, marketers worshipped at the altar of pageviews, bounce rates, and organic sessions. While these metrics still offer some directional value, they are increasingly disconnected from actual business impact.'),
  createParagraph('A high volume of organic traffic means nothing if it consists of top-of-funnel users looking for a quick definition who bounce immediately. Instead, marketing leaders must transition to metrics that indicate genuine engagement, brand affinity, and revenue contribution.'),
  
  createHeading('Shifting Your Analytics Focus', 'h3'),
  createParagraph('We recommend auditing your current reporting dashboards and replacing vanity metrics with engagement metrics. Here is a framework for how to think about modern content measurement:'),
  createList([
    'Replace "Pageviews" with "Active Reading Time" and "Scroll Depth".',
    'Replace "Overall Traffic" with "Qualified Traffic" (traffic hitting high-intent conversion pages).',
    'Replace "Social Followers" with "Active Community Members" or "Engaged Email Subscribers".',
    'Track "Content Sourced Pipeline" (revenue generated from accounts where content was a primary touchpoint).'
  ]),
  createParagraph('By aligning your metrics with actual business goals, you change the incentives for your content team. When writers are measured on revenue rather than raw traffic, they stop writing generic clickbait and start writing deeply researched, highly persuasive content designed for your ideal buyer profile.'),

  createBlock('faq', {
    title: 'Frequently Asked Questions',
    items: [
      { question: 'Should we still be doing keyword research?', answer: 'Yes, but the intent matters more than the volume. Focus on low-volume, high-intent keywords where you can provide a unique perspective rather than competing for generic terms.' },
      { question: 'How much should we rely on AI for writing?', answer: 'AI is excellent for outlining, structuring, and editing. However, the core ideas, the narrative voice, and the proprietary insights should always come from a human subject matter expert.' },
      { question: 'How long does it take to see ROI from this new approach?', answer: 'Building a true brand moat through original research and community takes longer than old-school SEO hacks. Expect a 6 to 9-month ramp-up period before seeing compounding returns, but those returns will be far more sustainable.' }
    ],
  }),

  createHeading('The Human Element is Your Ultimate Moat', 'h2'),
  createParagraph('As we look toward the future, one thing is abundantly clear: technology will continue to commoditize the mechanics of content creation. The cost to produce a 1,000-word article, a basic image, or a simple video will eventually drop to zero. When production costs approach zero, supply approaches infinity.'),
  createParagraph('In a world of infinite supply, human connection becomes the scarcest resource. Your audience doesn’t just want information; they have Google and ChatGPT for that. They want perspective, they want empathy, they want shared experiences, and they want to be part of a community that understands their specific challenges.'),
  createParagraph('The brands that will dominate the next decade are those that lean heavily into their humanity. They will highlight their experts, share their failures as openly as their successes, take polarizing stances on industry issues, and facilitate connections between their customers. Content marketing is no longer a game of algorithms and keywords. It is, once again, a game of human psychology, trust, and relationship building.'),

  createBlock('cta', {
    title: 'Ready to modernize your content engine?',
    description: 'Stop playing by the old rules. Join 10,000+ marketers receiving our weekly insights on building future-proof, high-ROI content strategies.',
    buttonText: 'Subscribe Now',
    buttonLink: '#newsletter',
  }),

  createHeading('Conclusion: The Path Forward', 'h2'),
  createParagraph('The transition from the traditional SEO era to the modern, AI-augmented, community-driven era will not be painless. It requires unlearning deeply ingrained habits, investing in new skills like data analysis and community management, and having the courage to publish fewer, but significantly better, pieces of content.'),
  createParagraph('However, for those willing to embrace this shift, the opportunity is massive. As your competitors continue to pump out generic, AI-generated articles in a desperate bid for declining search traffic, you have the chance to build a resilient, highly profitable brand moat. Start by identifying your unique point of view, gathering your first piece of proprietary data, and treating every piece of content not as a net to catch traffic, but as a magnet to attract your ideal tribe.'),
  createParagraph('The future of content marketing belongs to the bold, the original, and the unmistakably human. It is time to start building.'),
];

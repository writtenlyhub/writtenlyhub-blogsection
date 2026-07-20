export interface Category {
  id: string;
  title: string;
  slug: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: Category;
  author: Author;
  publishedDate: string;
  readTime: string;
  featuredImage: string;
  featuredHero?: boolean;
}

const AUTHOR_SARAH: Author = {
  id: '1',
  name: 'Sarah Jenkins',
  role: 'Lead Strategist',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCERAy6d81tQEJT_NSBA2VRraK1bXQqDQTzcV1fjiPGTGoVtswqkEn328Nf6fUE5CnA9wzHlMjOuL8bMHYbkQ7O_ngLytMp_n707Sk3Tn_wLO-FZQ-7Q6QbCcokNXQq7z7iVSq6QR4bW02rjOTib6m0mCW-faFLbFr9glx-Jf1R88WkNeuqHA8RTCe6umXjLy7LQRiasC6wYWloJ0uDPSd4ZV4SXzzzqebcA6Hs4T1ern8f_cJF2xkTEj0fPurh4YXNNFtdqMeVayI',
};

const AUTHOR_ALEX: Author = {
  id: '2',
  name: 'Alex Chen',
  role: 'SEO Specialist',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCERAy6d81tQEJT_NSBA2VRraK1bXQqDQTzcV1fjiPGTGoVtswqkEn328Nf6fUE5CnA9wzHlMjOuL8bMHYbkQ7O_ngLytMp_n707Sk3Tn_wLO-FZQ-7Q6QbCcokNXQq7z7iVSq6QR4bW02rjOTib6m0mCW-faFLbFr9glx-Jf1R88WkNeuqHA8RTCe6umXjLy7LQRiasC6wYWloJ0uDPSd4ZV4SXzzzqebcA6Hs4T1ern8f_cJF2xkTEj0fPurh4YXNNFtdqMeVayI', // Using same for mock
};

const AUTHOR_MARCUS: Author = {
  id: '3',
  name: 'Marcus Wright',
  role: 'Content Lead',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCERAy6d81tQEJT_NSBA2VRraK1bXQqDQTzcV1fjiPGTGoVtswqkEn328Nf6fUE5CnA9wzHlMjOuL8bMHYbkQ7O_ngLytMp_n707Sk3Tn_wLO-FZQ-7Q6QbCcokNXQq7z7iVSq6QR4bW02rjOTib6m0mCW-faFLbFr9glx-Jf1R88WkNeuqHA8RTCe6umXjLy7LQRiasC6wYWloJ0uDPSd4ZV4SXzzzqebcA6Hs4T1ern8f_cJF2xkTEj0fPurh4YXNNFtdqMeVayI',
};

const AUTHOR_ELENA: Author = {
  id: '4',
  name: 'Elena Rostova',
  role: 'Managing Editor',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCERAy6d81tQEJT_NSBA2VRraK1bXQqDQTzcV1fjiPGTGoVtswqkEn328Nf6fUE5CnA9wzHlMjOuL8bMHYbkQ7O_ngLytMp_n707Sk3Tn_wLO-FZQ-7Q6QbCcokNXQq7z7iVSq6QR4bW02rjOTib6m0mCW-faFLbFr9glx-Jf1R88WkNeuqHA8RTCe6umXjLy7LQRiasC6wYWloJ0uDPSd4ZV4SXzzzqebcA6Hs4T1ern8f_cJF2xkTEj0fPurh4YXNNFtdqMeVayI',
};

const AUTHOR_DAVID: Author = {
  id: '5',
  name: 'David Kim',
  role: 'B2B Strategist',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCERAy6d81tQEJT_NSBA2VRraK1bXQqDQTzcV1fjiPGTGoVtswqkEn328Nf6fUE5CnA9wzHlMjOuL8bMHYbkQ7O_ngLytMp_n707Sk3Tn_wLO-FZQ-7Q6QbCcokNXQq7z7iVSq6QR4bW02rjOTib6m0mCW-faFLbFr9glx-Jf1R88WkNeuqHA8RTCe6umXjLy7LQRiasC6wYWloJ0uDPSd4ZV4SXzzzqebcA6Hs4T1ern8f_cJF2xkTEj0fPurh4YXNNFtdqMeVayI',
};

const AUTHOR_MARIA: Author = {
  id: '6',
  name: 'Maria Gonzalez',
  role: 'Analytics Expert',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCERAy6d81tQEJT_NSBA2VRraK1bXQqDQTzcV1fjiPGTGoVtswqkEn328Nf6fUE5CnA9wzHlMjOuL8bMHYbkQ7O_ngLytMp_n707Sk3Tn_wLO-FZQ-7Q6QbCcokNXQq7z7iVSq6QR4bW02rjOTib6m0mCW-faFLbFr9glx-Jf1R88WkNeuqHA8RTCe6umXjLy7LQRiasC6wYWloJ0uDPSd4ZV4SXzzzqebcA6Hs4T1ern8f_cJF2xkTEj0fPurh4YXNNFtdqMeVayI',
};

const CAT_AI: Category = { id: 'c1', title: 'AI & Tech', slug: 'ai-tech' };
const CAT_SEO: Category = { id: 'c2', title: 'SEO', slug: 'seo' };
const CAT_CONTENT: Category = { id: 'c3', title: 'Content Marketing', slug: 'content-marketing' };
const CAT_STRATEGY: Category = { id: 'c4', title: 'Strategy', slug: 'strategy' };
const CAT_BRAND: Category = { id: 'c5', title: 'Brand Voice', slug: 'brand-voice' };

export const CATEGORIES: Category[] = [
  CAT_AI, CAT_SEO, CAT_CONTENT, CAT_STRATEGY, CAT_BRAND,
  { id: 'c6', title: 'Copywriting', slug: 'copywriting' },
  { id: 'c7', title: 'Case Studies', slug: 'case-studies' },
  { id: 'c8', title: 'Social Media', slug: 'social-media' },
  { id: 'c9', title: 'Email Marketing', slug: 'email-marketing' },
  { id: 'c10', title: 'Analytics', slug: 'analytics' },
  { id: 'c11', title: 'Industry News', slug: 'industry-news' },
];

export const MOCK_BLOGS: Blog[] = [
  {
    id: '1',
    title: 'The Future of AI in Content Strategy',
    excerpt: 'As generative models become more sophisticated, the role of the content strategist shifts from creation to curation and prompt engineering. Discover how top brands are navigating this transition without losing their authentic voice.',
    slug: 'future-of-ai-content-strategy',
    category: CAT_AI,
    author: AUTHOR_SARAH,
    publishedDate: 'March 15, 2024',
    readTime: '12 min read',
    featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyh8DjpWbAMq-UE3eNWryXAL-Y1cfsbgqfF6q2OvIkdc1K4rnuTOTl473Bt8kVrCZjl-IJ5Qh1uuvoHYIoWrGC7Ea1eKiYRqq0b0qbw2GOiIlprzmvDRt3OflJ7yh-Xg-oKX0OD3m6WIHEp3zYGu3LtYbRLVc3Xo4Ide0qsI91Io4yjF468irvJXGpHJxA5uC_nUg_2dhMnhjJk4jY1GLY5XVz7OxegEZY0LxZaUkXFB7a64uys4Ejn4P7ICGW0TjYqxaUaGEB2wc',
    featuredHero: true,
  },
  {
    id: '2',
    title: 'Mastering Semantic Search in 2024',
    excerpt: 'Keyword stuffing is dead. Learn how structuring your content for entity recognition and user intent can drastically improve your organic visibility.',
    slug: 'mastering-semantic-search-2024',
    category: CAT_SEO,
    author: AUTHOR_ALEX,
    publishedDate: 'March 10, 2024',
    readTime: '5 min read',
    featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWVab2vobAJVan86HTuVMrhVS_W0Vu1yOEsLGB78YqHPwjNnBn-G90aqvSAVz02RieekxO-13PMOtJ5g6JzQ4I63JSOuTNFvRq1UecqawQvLRXs1Lt68EUIuZG5FQCm8qlGlo8yNmxQv_WZjtm12SR-cE6hFjhBou_DIkOrdiJgiqVpnFYp4VizLjz76U3jDHAqgisga87qMglbxOrMuwuuqxl_bSQXNVklOIcUUJOEYJLy5gEKvut92_NLGvqLWpZAJ89QLyHV-g',
  },
  {
    id: '3',
    title: 'Measuring Content ROI Beyond Pageviews',
    excerpt: 'Traffic is vanity; engagement is sanity. A deep dive into the metrics that actually matter when evaluating the success of your content campaigns.',
    slug: 'measuring-content-roi-beyond-pageviews',
    category: CAT_CONTENT,
    author: AUTHOR_MARCUS,
    publishedDate: 'March 08, 2024',
    readTime: '8 min read',
    featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAly25P27UdqoR0I4M7WjSaktkZ5_gRULiaePaKnuISDzWsBoSJOWozJAceUGMdF2w0SzfZZ4M0jI1QdUnnIE6ZypaPyZIA7LXuQKN65GLnosOvov5Bu0z2SveynhU8tLsVx3ZjkUsagocDRsgysltO9Bf701mWUN7m5GDj9uaGZ6tPeWuaOCC09-SMjDjEyWlUXwZHVo5NBM2BHJ6sY0XOSxseEmChBw54qUm9L60HIJSxa9aWg_6ue3Q2A1gyUVh8s6KzkGgl-o',
  },
  {
    id: '4',
    title: 'Building a Resilient Editorial Calendar',
    excerpt: 'How to design a publishing schedule that withstands shifting priorities, unexpected trends, and team bandwidth constraints.',
    slug: 'building-resilient-editorial-calendar',
    category: CAT_STRATEGY,
    author: AUTHOR_ELENA,
    publishedDate: 'March 05, 2024',
    readTime: '4 min read',
    featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcHk8XDzM_74ryFYoBj9a28wqmOqxGvZjhqoGUCrK-wxtxWJoOtZgWOHmIX7qanqwnv-uZtrW0LtgeYFMLlZBANUkzfRLC36ba4Ku8uJFjK5vg9ALxJbvE2gsgs_13JLxMxO2N9vX1hY0oHXbQrcjFrEdvsEBZsxExREzXO5kvyBUN_4CWdwYCY9TVnQzj1kswba51dnNWs7z4OBBnjr9wocMuN1q0z0s9udnS_OKrf8SAA95eegxG38q5zdO3g2eK9RIWUVNXkV0',
  },
  {
    id: '5',
    title: 'Maintaining Consistency Across Channels',
    excerpt: 'Strategies to ensure your brand sounds like itself whether it\'s a technical whitepaper, a witty tweet, or an automated email sequence.',
    slug: 'maintaining-consistency-across-channels',
    category: CAT_BRAND,
    author: AUTHOR_SARAH,
    publishedDate: 'March 02, 2024',
    readTime: '6 min read',
    featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0WabBuIA0ZQVNTXUKQWQ4gvIBuFgKh0zJeJIrW7bGo7Q6uksSjX91xHssMZgvGJJJQGDxC3Z3z3h448WLDeopCteFad-f9LC8QxDgHFEW8Q2eTrTqx3I7aJxYLk-8-gYl1mDRW0ulqvXksIB6vjoN8XKIkr6955Y5iXo-P6KmkPLOtmbbAmI6v_l-rxaKPSo4jKoFMtJtpdgjcYk7RxmReYmR5BnOSRXkiP5Zzv7r8u3k9GxSxsJOLg5zx6LodCvD_I9ux3ST8rk',
  },
  {
    id: '6',
    title: 'Prompt Engineering for B2B Content',
    excerpt: 'Discover the specific frameworks and prompts that leading B2B marketers use to generate high-quality thought leadership drafts with AI.',
    slug: 'prompt-engineering-b2b-content',
    category: CAT_AI,
    author: AUTHOR_DAVID,
    publishedDate: 'February 28, 2024',
    readTime: '7 min read',
    featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeiWeBff_e7VoeYpo50ehDWqkcUlUE8Kiuy9kQ_EW64BkiDQnAc9udn5M2qowtMt2qQt8UKVouG26W8KnMatX6RW3wpG4Xfloj3UKV8Kz6dMCFUpp5IqOkp0SdYzWJlNVbI1cTn_Wsd51YRttu90x9Qt6iTUQA2JHGLuNYG49chiOjBHOc5BML33qV3o2y3eaCzIB0zLyZaHOYj-7sxMznpdYQaQJTr8vKESyeM8z8JkO3PD7j3hX4NwwM_K9syc-K0NfD-nBoxWM',
  },
  {
    id: '7',
    title: 'The Impact of SGE on Organic Traffic',
    excerpt: 'Google\'s Search Generative Experience is changing the landscape. Here is our early data on how it impacts click-through rates and what you should do.',
    slug: 'impact-of-sge-organic-traffic',
    category: CAT_SEO,
    author: AUTHOR_MARIA,
    publishedDate: 'February 25, 2024',
    readTime: '10 min read',
    featuredImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ8-zJn5HSsN-ZsMIbBLUXuAX-qVPHei6R0X1g_elVRW6A5XqDU7EA-9zEUUcd2CwE2J77Vyu28dFauc7nJjWVV7VZrAPhfcSA6vCTjxJhcBVWAEi7_toeyuojMaGfKoN2EQoWOr_lHGQ6s4ugJYD-XJ-WBmfCi_wcG8sw0xCjftcqyyApWhODrtd6K8vK39SdnKsWai9gfMKBxlmm2vkAbXsp9hoi473zINnT3ahTQUSm0qI0iZXcW1Bqj23Itz_P26-qjaGjTgY',
  },
];

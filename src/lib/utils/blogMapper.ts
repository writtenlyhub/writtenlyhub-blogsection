import { BlogDetailData } from '@/types/blog';
import { MOCK_DATA } from '@/lib/mock/blog';

// TODO: Payload CMS - In the future, this function will take the raw Payload document
// (e.g., of type 'Post') and map it to the 'BlogDetailData' interface expected by our UI.
// For now, it returns the mock data directly.
export function mapBlogData(rawPayloadData: unknown): BlogDetailData {
  // If we had real payload data, we would map it here.
  // Example:
  // return {
  //   hero: {
  //     title: rawPayloadData.title,
  //     category: rawPayloadData.category?.title || 'Uncategorized',
  //     // ... map other fields
  //   },
  //   // ...
  // }
  
  if (!rawPayloadData) {
    return MOCK_DATA;
  }
  
  return MOCK_DATA;
}

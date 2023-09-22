// utils/rssFeed.ts
import fetch from 'isomorphic-unfetch';
import parser from 'fast-xml-parser';

export async function fetchAndParseRSS(affiliateId: string): Promise<string[]> {
  try {
    const rssResponse = await fetch('https://whop.com/feed/');
    const rssText = await rssResponse.text();
    const rssJson = parser.parse(rssText);
    const extractedUrls = rssJson.rss.channel.item.map(item => item.link);
    const updatedUrls = extractedUrls.map(url => `${url}?a=${affiliateId}`);
    return updatedUrls;
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
    throw error;
  }
}

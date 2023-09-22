import { useState } from 'react';
import { validateToken, WhopAPI } from "@whop-apps/sdk";
import { headers } from "next/headers";
import OpenButton from "@/components/OpenButton";
import { fetchAndParseRSS } from '../utils/rssFeed';

export default async function UserPage({
  params,
}: {
  params: { productId: string };
}) {
  const [rssUrls, setRssUrls] = useState<string[]>([]);
  
  async function handleFetchRSS() {
    try {
      await validateToken({ headers });  // Ensure only authenticated users can access this page
      const user = await WhopAPI.user({ headers }).GET("/me", {});  // Fetch the user's information
      const affiliateUrls = await fetchAndParseRSS(user.data?.username);
      setRssUrls(affiliateUrls);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  }

  return (
    <div className="pt-5 space-y-2">
      <p>Product ID: {params.productId}</p>
      <OpenButton />
      <button onClick={handleFetchRSS}>Fetch RSS</button>
      {rssUrls.length > 0 && (
        <div>
          <h3>Affiliate URLs:</h3>
          <ul>
            {rssUrls.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Import necessary packages and components
import { useState, useEffect } from 'react';
import { validateToken, WhopAPI } from "@whop-apps/sdk";
import { headers } from "next/headers";
import OpenButton from "@/components/OpenButton";
import { fetchAndParseRSS } from '../utils/rssFeed';

// Define the UserPage component
export default function UserPage({ params }: { params: { productId: string } }) {
  // Define a state variable to hold the RSS URLs
  const [rssUrls, setRssUrls] = useState<string[]>([]);

  // Define an async function to handle fetching the RSS feed
  async function handleFetchRSS() {
    try {
      // Validate the user token and fetch the user's information
      await validateToken({ headers });
      const user = await WhopAPI.user({ headers }).GET("/me", {});

      // Fetch and parse the RSS feed, then update the state variable with the modified URLs
      const affiliateUrls = await fetchAndParseRSS(user.data?.username);
      setRssUrls(affiliateUrls);
    } catch (error) {
      // Log any errors to the console
      console.error(error);
    }
  }

  // Render the component
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

export const client = true;  // This line tells Next.js to treat UserPage as a client component

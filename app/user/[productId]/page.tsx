'use client';

import { validateToken, WhopAPI } from "@whop-apps/sdk";
import { headers } from "next/headers";
import OpenButton from "@/components/OpenButton";
import fetch from 'isomorphic-unfetch';
import parser from 'fast-xml-parser';

const UserPage = ({ params }: { params: { productId: string } }) => {
  const [user, setUser] = React.useState(null);
  const [urls, setUrls] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await validateToken({ headers });  // Ensure only authenticated users can access this page

        // Fetch user info
        const userResponse = await WhopAPI.user({ headers }).GET("/me", {});
        setUser(userResponse.data);

        // Fetch and parse RSS feed
        const rssResponse = await fetch('https://whop.com/feed/');
        const rssText = await rssResponse.text();
        const rssJson = parser.parse(rssText);
        const extractedUrls = rssJson.rss.channel.item.map(item => item.link);
        const updatedUrls = extractedUrls.map(url => `${url}?a=${userResponse.data?.username}`);
        setUrls(updatedUrls);

      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-5 space-y-2">
      {user && (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      )}
      <p>Product ID: {params.productId}</p>
      <OpenButton />
      {urls && urls.map((url, index) => (
        <p key={index}>{url}</p>
      ))}
    </div>
  );
}

export default UserPage;

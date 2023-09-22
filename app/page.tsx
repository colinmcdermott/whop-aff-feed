import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const tasks = [
  // ... your tasks
];

const Home = ({ userData, initialMerchants }) => {
  const [merchants, setMerchants] = useState(initialMerchants);

  useEffect(() => {
    // Additional client-side fetching if necessary
  }, []);

  if (!userData) return null;  // Or render a loading spinner

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {/* ... rest of your code */}
      <div className="affiliate-feed">
        <h3 className="text-2xl font-bold mb-4">Affiliate Feed:</h3>
        {merchants.map(merchant => (
          <div key={merchant.id}>
            <a href={`https://whop.com/${merchant.name}?a=${userData.username}`}>
              {merchant.name}
            </a>
          </div>
        ))}
      </div>
    </main>
  );
};

export async function getServerSideProps() {
  const options = {
    method: 'GET',
    headers: { Authorization: process.env.WHOP_API_KEY },
  };

  try {
    const userRes = await fetch('https://api.whop.com/me', options);
    if (!userRes.ok) throw new Error(`Network response was not ok ${userRes.statusText}`);
    const userData = await userRes.json();

    const merchantRes = await fetch('https://whop.com/feed/');
    if (!merchantRes.ok) throw new Error(`Network response was not ok ${merchantRes.statusText}`);
    const merchantData = await merchantRes.json();

    return {
      props: {
        userData,
        initialMerchants: merchantData,  // Assuming merchantData is an array of merchant objects
      },
    };

  } catch (error) {
    console.error(error);
    return {
      notFound: true,  // This will render a 404 page
    };
  }
}

export default Home;

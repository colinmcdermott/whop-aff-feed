import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchData } from '../utils/api';

const tasks = [
  // ... your tasks data
];

export default function Home() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      const profile = await fetchData();
      setUserProfile(profile);
    }
    fetchUserProfile();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {/* ... rest of your code */}

      {userProfile && (
        <div>
          <h3>User Profile:</h3>
          <p>Email: {userProfile.email}</p>
          <p>Username: {userProfile.username}</p>
          <img src={userProfile.profile_pic_url} alt="Profile Picture" />
        </div>
      )}
    </main>
  );
}

// utils/api.js
export async function fetchData() {
  const options = {
    method: 'GET',
    headers: {
      Authorization: process.env.WHOP_API_KEY,
    },
  };

  try {
    const response = await fetch('https://api.whop.com/me', options);
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

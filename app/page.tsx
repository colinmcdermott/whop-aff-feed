import { WhopAPI } from "@whop-apps/sdk";
import { headers } from "next/headers";

export default async function Home() {
  const user = await WhopAPI.user({ headers }).GET("/me", {});

  const username = user.data?.username;
}
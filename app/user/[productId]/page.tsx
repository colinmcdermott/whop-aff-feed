import { validateToken, WhopAPI } from "@whop-apps/sdk";
import { headers } from "next/headers";
import OpenButton from "@/components/OpenButton";

export default async function UserPage({
  params,
}: {
  params: { productId: string };
}) {
  try {
    await validateToken({ headers }); // This will ensure only authenticated users can access this page

    const user = await WhopAPI.user({ headers }).GET("/me", {}); // This will fetch the user's information

    return (
      <div className="pt-5 space-y-2">
        <h2>Content Team</h2>
        <p><a href="https://docs.google.com/spreadsheets/d/12I4lEgrCwYnBEv4pf8O1FskS6tpRM-D3FFzo9ajG6gI/edit#gid=1753519888" target="_blank">Content Calendar</a></p>
        <p>Username: {user.data?.username}</p>
        <p>Email: {user.data?.email}</p>
        <OpenButton />
      </div>
    );
  } catch (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p>
          If you are the developer, make sure you are developing in the iFrame.
          For more details, head {""}
          <a
            className="underline text-blue-500"
            href="https://apps.whop.com/apps/environment"
            target="_blank"
          >
            here
          </a>
        </p>
      </div>
    );
  }
}

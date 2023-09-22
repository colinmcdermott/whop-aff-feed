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
      <main>
        <div className="pt-5 space-y-2">
          <h2>Content</h2>
          <ul>
            <li>Content Planner</li>
          </ul>>
        </div>

        <div className="pt-5 space-y-2">
          <p>Email: {user.data?.email}</p>
        </div>
      </main>
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

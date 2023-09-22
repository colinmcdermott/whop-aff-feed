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
      <div className="space-y-4">
        {/* New Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Useful Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="text-blue-500 underline">Link 1</a></li>
            <li><a href="#" className="text-blue-500 underline">Link 2</a></li>
            <li><a href="#" className="text-blue-500 underline">Link 3</a></li>
          </ul>
        </div>

        {/* Existing Section */}
        <div className="pt-5 space-y-2">
          <p>Username: {user.data?.username}</p>
          <p>Email: {user.data?.email}</p>
          <OpenButton />
        </div>
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

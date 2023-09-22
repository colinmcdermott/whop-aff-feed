import { validateToken, WhopAPI } from "@whop-apps/sdk";
import { headers } from "next/headers";
import OpenButton from "@/components/OpenButton";
import React from 'react';

export default async function UserPage({
  params,
}: {
  params: { productId: string };
}) {
  try {
    await validateToken({ headers }); // This will ensure only authenticated users can access this page

    const user = await WhopAPI.user({ headers }).GET("/me", {}); // This will fetch the user's information

    return (
      <>
        <main>
          <div className="p-1.5 space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Content</h2>
              <ul className="space-y-2">
                <li><a href="https://docs.google.com/spreadsheets/d/12I4lEgrCwYnBEv4pf8O1FskS6tpRM-D3FFzo9ajG6gI/edit#gid=1753519888" className="text-blue-500 underline">Content Calendar</a></li>
              </ul>
              <h3 className="text-xl font-bold mb-2">Article Planners</h2>
              <ul className="space-y-2">
                <li><a href="https://docs.google.com/spreadsheets/d/1dx27E6QZ1oSLeTMa9NaoMd8h1dNcuTn1vVUR4CN9G9c/edit#gid=0" className="text-blue-500 underline">Druvi</a></li>
                <li><a href="https://docs.google.com/spreadsheets/d/19IkP-1DPl4-dxR_sNhlmCJH8vKp4AE7DmqbTl04uic4/edit#gid=0" className="text-blue-500 underline">Kean</a></li>
                <li><a href="https://docs.google.com/spreadsheets/d/17bHrJgDbK5SP_KhSZ-x0KWPWgvUp3S1bwhgd32gYeKs/edit#gid=0" className="text-blue-500 underline">Alexios</a></li>
                <li><a href="https://docs.google.com/spreadsheets/d/1MAZfPOMf1jFWo3MEba1JlsBs4hYfhHyur6WsHZOxr44/edit#gid=0" className="text-blue-500 underline">Frank</a></li>
                <li><a href="https://docs.google.com/spreadsheets/d/1ZNiO5Ms2eOEJU2HEafCc0G9NclpDVIwuDHn274AG7Rg/edit#gid=0" className="text-blue-500 underline">JV</a></li>
                <li><a href="https://docs.google.com/spreadsheets/d/15VmRqv9IryxIMipIqSrIEaQy9yL_7aBUUJnV9it-Jrs/edit#gid=0" className="text-blue-500 underline">Roonie</a></li>
              </ul>
            </div>
            <div className="pt-5 space-y-2">
              <p>Username: {user.data?.username}</p>
              <p>Email: {user.data?.email}</p>
              <OpenButton />
            </div>
          </div>
        </main>
      </>
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

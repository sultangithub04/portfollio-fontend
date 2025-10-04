"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

export default function UserSidebar() {
  const session = useSession()

  return (
    <aside className="flex w-64 flex-col border-r bg-black text-white">
      {/* Top navigation */}
      <h2 className="flex justify-center items-center gap-2 pt-4 rounded-lg py-2 text-sm font-bold">
        <span>🔥</span> User Dashboard
      </h2>
      <nav className="flex-1 space-y-2 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>

        <Link
          href="/dashboard/create-blog"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <PlusCircle className="h-4 w-4" />
          Create Blog
        </Link>
        <Link
          href="/dashboard/update-blog"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <PlusCircle className="h-4 w-4" />
          Manage Blog
        </Link>

      </nav>

      {/* Bottom action */}
      <div className="p-4 border-t border-gray-500">
        {session?.status === "authenticated" && (
          <Button
            variant="destructive"
            className="w-full justify-start gap-2 cursor-pointer"
            onClick={async () => {
              await signOut({
                redirect: false, // prevent auto redirect
              });
              toast.success("Logged out successfully");
              // optional: manual redirect after logout
              window.location.href = "/";
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        )}
      </div>
    </aside>
  );
}

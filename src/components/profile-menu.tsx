"use client";

import { useEffect, useRef, useState } from "react";
import { logout } from "@/actions/logout";

interface ProfileMenuProps {
  displayName: string | null;
  pictureUrl: string | null;
}

export default function ProfileMenu({ displayName, pictureUrl }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative ml-2">
      <button type="button" onClick={() => setOpen((prev) => !prev)} className="flex items-center gap-2 cursor-pointer">
        {pictureUrl ? (
          <img
            src={pictureUrl}
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-500">
            {displayName?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}
        {displayName && (
          <p className="hidden sm:block text-sm font-medium text-gray-900">
            {displayName}
          </p>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-lg border bg-white shadow-md z-50 py-1">
          <a
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Profile
          </a>
          <a
            href="/forget-password"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Reset password
          </a>
          <div className="my-1 border-t" />
          <form action={logout}>
            <button
              type="submit"
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 cursor-pointer"
            >
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

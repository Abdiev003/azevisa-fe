"use client";

import { useRouter } from "next/navigation";

export function LogoutButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  function handleLogout() {
    document.cookie =
      "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    document.cookie =
      "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleLogout} className={className}>
      {children}
    </button>
  );
}

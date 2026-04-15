import { fetcher } from "@/lib/fetcher";
import { cookies } from "next/headers";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone_number: string;
  avatar: string | null;
  preferred_language: "en" | "az" | "ru";
  role: "applicant" | "admin";
  is_email_verified: boolean;
  created_at: string;
  last_login: string | null;
};

export const getUser = async (): Promise<User | null> => {
  const store = await cookies();
  const token = store.get("access_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const res = await fetcher("/accounts/profile/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

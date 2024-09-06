import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SignUpPage } from "./Signup";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/profile");
  }
  return <SignUpPage />;
}

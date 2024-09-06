import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Login from "./Login";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session?.user) {
    redirect("/profile");
  }
  return <Login />;
}

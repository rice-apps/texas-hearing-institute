import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createClient(cookies());

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
  <div>
    <h1>Welcome {session?.user.email}</h1>
    {session ?
      <form action="/auth/logout" method="post">
        <button type="submit">Sign out</button>
      </form> :
      <a href="/auth/login">Sign in</a>
    }
  </div>)
}

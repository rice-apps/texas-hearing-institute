import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import LoginBox from './page_components/LoginBox';

export default async function Home() {
  const supabase = createClient(cookies());

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
  <div>
    <LoginBox />
  </div>)
}

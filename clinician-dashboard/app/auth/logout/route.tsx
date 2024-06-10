import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Check if we have a session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { 
    data: data1, error 
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  if (user || data1) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL("/", req.url), {
    status: 302,
  });
}

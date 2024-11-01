import { Provider } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { slug: string } }
  ) {
    const provider = params.slug as Provider;
  
    let options: { redirectTo: string; scopes?: string } = {
      redirectTo: `${new URL(req.url).origin}/auth/callback`,
      scopes: provider === 'azure' ? 'email profile' : ''
    };
  
    if (provider) {
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options,
      });
  
      if (error) throw error;

      return NextResponse.redirect(data.url);
    }
  
    return NextResponse.redirect(new URL("/", req.url));
  }
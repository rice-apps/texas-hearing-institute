"use client";
import Header from "@/components/Header";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/supabaseClient";

/*
validate token before load components
grabs the user too


*/

import { createHash } from "crypto";

function Form(parent_id: string) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function updatePassword(newPassword: string) {
    // TODO: hash pw
    const hashedPW = newPassword;
    const { error } = await supabase
      .from("users")
      .update({ password: hashedPW })
      .eq("id", parent_id);

    console.log(error);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // TODO: add password validators for length, complexity
    if (password !== confirmPassword) {
      alert("Passwords must match");
    } else {
      console.log(password);
      updatePassword(password);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="password" className="text-sm mb-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="input input-bordered w-full mb-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="password-confirm" className="text-sm mb-1">
        Confirm password
      </label>
      <input
        type="password"
        id="password-confirm"
        name="password-confirm"
        className="input input-bordered w-full mb-4"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        className="btn w-1/2 rounded-full normal-case bg-sky-200"
        type="submit"
        disabled={!password || !confirmPassword}
      >
        Save
      </button>
    </form>
  );
}

export default function ResetPassword() {
  const [state, setState] = useState({
    isLoading: true,
    data: "",
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return <>Unexpected error</>;
  }

  async function validateToken(): Promise<string> {
    // hash the token and validate in db
    const token_hash = createHash("sha256").update(token!!).digest("hex");

    const { data: user_data } = await supabase
      .from("password_reset_tokens")
      .select("user_id, token_expiry")
      .eq("token", token_hash)
      .maybeSingle();

    if (!user_data) {
      return "invalid token";
    } else if (user_data.token_expiry < Date.now()) {
      return "token expired";
    }

    // grab the user associated with this reset token
    const user_id: string = user_data.user_id;
    const { data: parent_data } = await supabase
      .from("children")
      .select("parentuser")
      .eq("id", user_id)
      .maybeSingle();

    if (!parent_data) {
      return "unexpected error";
    }

    return parent_data.parentuser;
  }

  useEffect(() => {
    const getUser = async () => {
      const response = await validateToken();

      setState({
        isLoading: false,
        data: response,
      });
    };
    getUser();
  }, []);

  if (state.isLoading) {
    // TODO spinner
    return <>Loading...</>;
  } else if (state.data == "") return <>Error</>;

  return (
    <div className="flex h-screen w-screen bg-white text-gray-700 justify-center">
      <div className="flex flex-col py-56 w-72">
        <h2 className="text-xl font-bold mb-2">Reset password</h2>
        <p className="mb-6">Please enter a new password for your account</p>
        <Form parent_id={state.data} />
      </div>
    </div>
  );
}

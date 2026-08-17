"use client";

import { useEffect } from "react";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";

/** Lets Supabase consume a magic-link token after its redirect on any page. */
export function AuthSessionHandler() {
  useEffect(() => {
    if (hasSupabaseConfig) createClient();
  }, []);

  return null;
}

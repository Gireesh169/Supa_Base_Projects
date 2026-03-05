import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vqvicthqlebcxsjvzwiv.supabase.co";
const supabaseKey = "sb_publishable_4-vu47vkMQv0cj1fqEJBSA_5MpghVHa";

export const supabase = createClient(supabaseUrl, supabaseKey);
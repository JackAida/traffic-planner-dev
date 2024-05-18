import { createClient } from "@supabase/supabase-js";
//import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
//const supabase_url = (PUBLIC_SUPABASE_URL) ? PUBLIC_SUPABASE_URL : process.env.PUBLIC_SUPABASE_URL;
//const supabase_key = (PUBLIC_SUPABASE_ANON_KEY) ? PUBLIC_SUPABASE_ANON_KEY : process.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase_url = process.env.PUBLIC_SUPABASE_URL;
const supabase_key = process.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient( 
    //@ts-expect-error: process.env to be set in caprover
    supabase_url,
    supabase_key
);

export default supabase;
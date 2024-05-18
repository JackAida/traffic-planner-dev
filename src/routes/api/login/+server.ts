import supabase from "$lib/supabase";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    console.log("Someone is Logging in...");
    const { email, password } = await request.json();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log(data, error);
    return new Response(JSON.stringify({ data, error }));
}
import supabase from "$lib/supabase";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    console.log("Someone Registered");
    const { email, password } = await request.json();
    const { data, error } = await supabase.auth.signUp({ email, password });
    return new Response(JSON.stringify({ data, error }));
}
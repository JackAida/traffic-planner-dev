import supabase from "$lib/supabase";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    return new Response();
}
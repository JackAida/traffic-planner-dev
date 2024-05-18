import supabase from "$lib/supabase";

/** @type {import('./$types').RequestHandler} */
export async function POST(request: Request) {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        return new Response(JSON.stringify({ data, error }), {
            status: 500
        });
    }

    return new Response(JSON.stringify({ data, error }));
}
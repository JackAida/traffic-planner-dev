import supabase from '$lib/supabase.js';
type userData = { id: string; email: string; other?: any; };
export async function load( {cookies} ){
    let { data, error } = await supabase.auth.getSession();
    console.log("session!: ", data, error);
    let userData: userData = { id: "undefined", email: "undefined", other: {} };
    if(data.session){
        let user = await supabase.auth.getUser();
        if (user.error){
            console.log("error: " + user.error);
            cookies.set("token", "undefined", { path: "/" });
            return { token: "undefined" };
        }
        if (user.data.user?.id && user.data.user?.email){
            userData = {
                id: user.data.user?.id,
                email: user.data.user?.email, //@ts-expect-error: weak password sometimes exists
                other: {weakPassword: data.session?.weak_password}
            };
        }
        let token = user.data.user?.id;
        if(token==null)token="undefined";
        cookies.set("token", token, { path: "/" });
    }
    console.log("load");
    const token = (cookies.get("token") && data.session!=null) ? cookies.get("token") : "undefined";
    console.log("token: " + token);
    return { token: token,
            userData: userData
     };
}
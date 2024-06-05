export async function FetchApi(url,options) {
    try {
        const resp = await fetch(url,options);
        const data = await resp.json();
        return data;
    } catch (error) {
        alert("hubo un error", error)
        
    }   
}
export const fetchData = async (url) => {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error({"error": `${response.statusText} : status ${response.status}`})
        }

        return await response.json()
    } catch (e){
       console.error(e)
    }
}
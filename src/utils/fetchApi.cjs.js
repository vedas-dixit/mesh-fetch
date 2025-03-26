async function fetchAPI(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        return { success: false, message: `Error fetching API: ${error.message}` };
    }
}
module.exports = fetchAPI;
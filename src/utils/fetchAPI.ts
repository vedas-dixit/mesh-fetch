export async function fetchAPI(url: string, options: RequestInit = {}) {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error: any) {
      return { success: false, message: `Error fetching API: ${error.message}` };
    }
  }
  
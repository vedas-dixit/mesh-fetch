export async function fetchAPIWithRetry(
    url: string,
    options: RequestInit = {},
    retries: number = 3,
    delay: number = 400
  ): Promise<any> {
    let attempts = 0;
  
    while (attempts < retries) {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
      } catch (error) {
        // Specify the error type as an instance of Error
        if (error instanceof Error) {
          attempts++;
          if (attempts >= retries) {
            return { success: false, message: `Error fetching API after ${retries} attempts: ${error.message}` };
          }
        } else {
          return { success: false, message: `Unknown error occurred` };
        }
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };
  
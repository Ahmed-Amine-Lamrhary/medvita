export interface CallApiI {
    endpoint: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: any
}

export const callApi = async (callApiBody: CallApiI): Promise<any> => {
    const { method, endpoint, body } = callApiBody;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}`, {
            body: JSON.stringify(body as any),
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${result.message || 'Unknown error'}`);
        }

        return {
            data: result,
            status: response.status
        };
    } catch (error: any) {
        console.error('Error calling API:', error);
        throw error;
    }
}

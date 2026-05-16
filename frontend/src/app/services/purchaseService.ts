import BASE_URL from './api';

export async function createPurchase(data: any) {

    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/purchase`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },

        body: JSON.stringify(data)
    });

    return response.json();
}
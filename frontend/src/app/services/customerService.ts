import BASE_URL from './api';

export async function getCustomers() {

    const response = await fetch(`${BASE_URL}/customers`);

    return response.json();
}
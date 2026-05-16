import BASE_URL from './api';

export async function getDashboardData() {

    const response = await fetch(`${BASE_URL}/dashboard`);

    return response.json();
}
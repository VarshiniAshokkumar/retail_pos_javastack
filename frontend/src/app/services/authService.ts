import BASE_URL from './api';

export async function loginUser(username: string, password: string) {

    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}
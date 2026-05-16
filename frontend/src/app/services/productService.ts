import BASE_URL from './api';

export async function getProducts() {

    const response = await fetch(`${BASE_URL}/products`);

    return response.json();
}

export async function addProduct(product: any) {

    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/products`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },

        body: JSON.stringify(product)
    });

    return response.json();
}

export async function deleteProduct(id: number) {

    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response;
}
import { useState } from 'react';

const useApi = (baseUrl) => {
    const [error, setError] = useState(null);

    const fetchData = async (url, options) => {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Error al realizar la solicitud');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const get = async (path) => {
        const url = `${baseUrl}${path}`;
        return await fetchData(url);
    };

    const post = async (path, body) => {
        const url = `${baseUrl}${path}`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        return await fetchData(url, options);
    };

    const put = async (path, body) => {
        const url = `${baseUrl}${path}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        return await fetchData(url, options);
    };

    const remove = async (path) => {
        const url = `${baseUrl}${path}`;
        const options = {
            method: 'DELETE',
        };
        return await fetchData(url, options);
    };

    return { error, get, post, put, remove };
};

export default useApi;

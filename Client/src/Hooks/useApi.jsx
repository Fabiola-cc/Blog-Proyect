import { useState } from 'react';
import { md5 } from 'js-md5'

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

    const [loading, setLoading] = useState(false);
  
    const login = async (username, password) => {
        console.log(username)
        console.log(password)
        try {
            setLoading(true);
            const body = {
                username: username,
                password: md5(password)
            };
            const fetchOptions = {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                'Content-Type': 'application/json'
                }
            };
            const response = await fetch('https://api.tiburoncin.lat/23787/login', fetchOptions);
            const data = await response.json();
            if (response.ok) {
                console.log('ok')
                return data.access_token;
            } else {
                throw new Error('Usuario o contraseña incorrecta');
            }
        } catch (error) {
            console.log('buuu')
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { error, get, post, put, remove, loading, login };
};

export default useApi;

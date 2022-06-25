const TOKEN_CYBERSOFT = process.env.REACT_APP_CYBERSOFT_TOKEN;

export const getRequestConfig = (accessToken) => {
    const config = {
        headers: {
            TokenCybersoft: TOKEN_CYBERSOFT,
        },
    };
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
};

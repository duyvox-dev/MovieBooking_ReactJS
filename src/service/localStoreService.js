const USER = "USER_INFO";
export const localStoreService = {
    setUserLocal: (data) => {
        const dataJson = JSON.stringify(data);
        localStorage.setItem(USER, dataJson);
    },
    getUserLocal: () => {
        let dataJson = localStorage.getItem(USER);
        if (dataJson) {
            return JSON.parse(dataJson);
        }
        return null;
    },
    removeUserLocal: () => {
        let dataJson = localStorage.getItem(USER);

        if (dataJson) {
            localStorage.removeItem(USER);
        }
    },
};

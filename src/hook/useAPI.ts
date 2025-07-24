interface HookProps {
    mock?: boolean;
}

export const useAPI = ({ mock = false }: HookProps = {}) => {
    let baseUrl: string = import.meta.env.API_URL || "http://localhost:3000";

    if (mock) {
        baseUrl = "";
    }

    const getUrl = (endpoint: string) => {
        return `${baseUrl}/${endpoint}`;
    };

    return { baseUrl, getUrl };
};

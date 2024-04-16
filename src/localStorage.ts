export const parseJsonArray = (data: string): string[] | null => {
    try {
        const json: string[] = JSON.parse(data);
        if (Array.isArray(json)) {
            for (const item of json) {
                if (typeof item !== "string") {
                    throw new Error("Inalid item type.");
                }
            }
            return json;
        }
        return null;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const getItemsFromLocalStorage = (): string[] | null => {
    try {
        const data = localStorage.getItem("wheel-items");
        if (!data) return null;
        return parseJsonArray(data);
    } catch (e) {
        return null;
    }
};

export const setItemsToLocalStorage = (data: string[]): null => {
    try {
        localStorage.setItem("wheel-items", JSON.stringify(data));
        return null;
    } catch (error) {
        return null;
    }
};

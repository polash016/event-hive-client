// "use client";
export const saveToLocalStorage = (key: string, token: string) => {
  if (!token || typeof window === "undefined") {
    return "";
  }
  if (typeof window !== "undefined") {
    const value = localStorage.setItem(key, token);
    return value;
  }
};

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    return value;
  }
};

export const removeFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  if (typeof window !== "undefined") {
    const value = localStorage.removeItem(key);
    return value;
  }
};

import secureLocalStorage from "react-secure-storage";

type Maybe<T> = T | null | undefined;

const authChannel = new BroadcastChannel("credential_channel");

const STORAGE_KEY = import.meta.env.VITE_SECURE_STORAGE_KEY;

export const setSecureItem = (value: string) => {
  try {
    const toStore = value === undefined ? null : typeof value === "object" ? JSON.stringify(value) : String(value)
    secureLocalStorage.setItem(STORAGE_KEY, toStore as string);
    authChannel.postMessage("credential_set");
  }
  catch (error) {
    console.error("[secureStorage] set error:", error);
  }
}

export const getSecureItem = <T = unknown>(): Maybe<T> => {
  try {
    const raw = secureLocalStorage.getItem(STORAGE_KEY) as unknown as string | null | undefined;
    if (raw === null || raw === undefined) return null

    try { return JSON.parse(raw) as T }
    catch { return (raw as unknown) as T; }
  }
  catch (error) {
    console.error("[secureStorage] get error:", error);
    return null;
  }
};

export const removeSecureItem = () => {
  try {
    secureLocalStorage.removeItem(STORAGE_KEY);
    authChannel.postMessage("credential_removed");
  } catch (error) {
    console.error("[secureStorage] remove error:", error);
  }
}
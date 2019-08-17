// Local Storage Version
const LOCAL_STORE_VERSION = "0.8.1";

export const GetLocalData = (key:string, versionLock:boolean=true): string | null => {
    if (versionLock) {
        return localStorage.getItem(`${key}${LOCAL_STORE_VERSION}`)
    } else {
        return localStorage.getItem(key)
    }
};

export const SetLocalData = (key:string, value:string, versionLock:boolean=true): void => {
    if (versionLock) {
        return localStorage.setItem(`${key}${LOCAL_STORE_VERSION}`, value)
    } else {
        return localStorage.setItem(key, value)
    }
};
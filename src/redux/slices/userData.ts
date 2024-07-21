// utils/localStorage.ts

export interface UserInfo {
    name: string;
    email?: string;
    otp?: string;
    role: string;
    avatar? :string;
}

const STORAGE_KEY = 'userData';

export const saveUserInfo = (info: UserInfo): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
};

export const getUserInfo = (): UserInfo | null => {
    const storedInfo = localStorage.getItem(STORAGE_KEY);
    return storedInfo ? JSON.parse(storedInfo) : null;
};

export const clearUserInfo = (): void => {
    localStorage.removeItem(STORAGE_KEY);
};
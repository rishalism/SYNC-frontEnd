// utils/localStorage.ts

interface UserInfo {
    name: string;
    email: string;
    otp?: string;
    role: string;
}

const STORAGE_KEY = 'projectLeadInfo';

export const saveProjectLeadInfo = (info: UserInfo): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
};

export const getProjectLeadInfo = (): UserInfo | null => {
    const storedInfo = localStorage.getItem(STORAGE_KEY);
    return storedInfo ? JSON.parse(storedInfo) : null;
};

export const clearProjectLeadInfo = (): void => {
    localStorage.removeItem(STORAGE_KEY);
};
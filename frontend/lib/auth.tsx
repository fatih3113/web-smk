export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('smk_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('smk_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('smk_token');
};

export const isLoggedIn = (): boolean => {
  return !!getToken();
};
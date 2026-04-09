import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'tipid-theme';

const ThemeContext = createContext(undefined);

const getStoredTheme = () => {
    if (typeof window === 'undefined') {
        return 'dark';
    }

    try {
        const storedTheme = window.localStorage.getItem(STORAGE_KEY);
        if (storedTheme === 'light' || storedTheme === 'dark') {
            return storedTheme;
        }
    } catch {
        // Ignore storage read errors and fall back to dark.
    }

    return 'dark';
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getStoredTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);

        try {
            window.localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // Ignore storage write errors.
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
    };

    const value = useMemo(
        () => ({
            theme,
            isDark: theme === 'dark',
            setTheme,
            toggleTheme,
        }),
        [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};

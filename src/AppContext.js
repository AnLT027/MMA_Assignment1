import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'profile-activity-settings';
export const DEFAULT_PROFILE = {
    name: 'AnLe',
    bio: 'Hello I will go to buy honor win 2.',
    age: 20,
    job: 'Student',
};

const lightTheme = {
    background: '#f4f6fb',
    surface: '#ffffff',
    text: '#172033',
    muted: '#68738a',
    border: '#e1e6ef',
    primary: '#4667d5',
};

const darkTheme = {
    background: '#151923',
    surface: '#222938',
    text: '#f3f5fa',
    muted: '#b0b8c8',
    border: '#3b4557',
    primary: '#9aafff',
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [profile, setProfile] = useState(DEFAULT_PROFILE);
    const [dark, setDark] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        async function loadSettings() {
            try {
                const saved = await AsyncStorage.getItem(STORAGE_KEY);
                if (saved) {
                    const data = JSON.parse(saved);
                    if (typeof data.name === 'string' && data.name.trim() && typeof data.bio === 'string') {
                        setProfile({
                            name: data.name,
                            bio: data.bio,
                            age: typeof data.age === 'number' ? data.age : DEFAULT_PROFILE.age,
                            job: typeof data.job === 'string' ? data.job : DEFAULT_PROFILE.job,
                        });
                    }
                    if (typeof data.dark === 'boolean') setDark(data.dark);
                }
            } catch (error) {
                console.warn('Could not load saved settings; using defaults.', error);
            } finally {
                setReady(true);
            }
        }

        loadSettings();
    }, []);

    useEffect(() => {
        if (!ready) return;

        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ...profile, dark })).catch((error) => {
            console.warn('Could not save settings.', error);
        });
    }, [profile, dark, ready]);

    return (
        <AppContext.Provider
            value={{
                profile,
                saveProfile: setProfile,
                dark,
                toggleTheme: () => setDark((current) => !current),
                theme: dark ? darkTheme : lightTheme,
                ready,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used inside AppProvider.');
    return context;
}

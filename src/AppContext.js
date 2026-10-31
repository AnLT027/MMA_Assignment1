import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'profile-activity-settings';
export const DEFAULT_PROFILE = {
    name: 'AnLe',
    bio: 'Hello I will go to buy honor win 2.',
    age: 20,
    job: 'Student',
};

export const DEFAULT_ACTIVITIES = [
    { id: '1', title: 'Đọc sách 20 phút', done: false },
    { id: '2', title: 'Đi bộ ngoài trời', done: false },
    { id: '3', title: 'Học một điều mới', done: false },
];

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
    const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);
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
                    if (Array.isArray(data.activities)) {
                        setActivities(data.activities);
                    }
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

        AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ ...profile, dark, activities })
        ).catch((error) => {
            console.warn('Could not save settings.', error);
        });
    }, [profile, dark, activities, ready]);

    function toggleActivity(id) {
        setActivities((current) =>
            current.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
        );
    }

    function addActivity(title) {
        if (!title || !title.trim()) return false;
        const newItem = {
            id: Date.now().toString(),
            title: title.trim(),
            done: false,
        };
        setActivities((current) => [newItem, ...current]);
        return true;
    }

    function deleteActivity(id) {
        setActivities((current) => current.filter((item) => item.id !== id));
    }

    function resetActivities() {
        setActivities(DEFAULT_ACTIVITIES);
    }

    return (
        <AppContext.Provider
            value={{
                profile,
                saveProfile: setProfile,
                dark,
                toggleTheme: () => setDark((current) => !current),
                theme: dark ? darkTheme : lightTheme,
                ready,
                activities,
                setActivities,
                toggleActivity,
                addActivity,
                deleteActivity,
                resetActivities,
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

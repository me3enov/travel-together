// Функция для сохранения состояния в localStorage
export const saveToLocalStorage = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('gameState', serializedState);
    } catch (e) {
        console.error('Could not save state', e);
    }
};

// Функция для загрузки состояния из localStorage
export const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('gameState');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.error('Could not load state', e);
        return undefined;
    }
};

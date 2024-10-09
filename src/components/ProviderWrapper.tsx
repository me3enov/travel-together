"use client";

import { Provider } from 'react-redux';
import { store } from '../store';

// Упрощенный ProviderWrapper, только для работы с Redux
export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

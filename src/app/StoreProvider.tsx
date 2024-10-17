'use client'
import { useRef, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '../lib/store'
import { Store } from '@reduxjs/toolkit'; // 引入 Store 類型


interface StoreProviderProps {
    children: ReactNode; // 明确 children 的类型
}

export default function StoreProvider({ children }: StoreProviderProps) {
    const storeRef = useRef<Store | undefined>(undefined); // 指定 storeRef 的类型

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
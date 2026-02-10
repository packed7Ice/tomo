import React from 'react';
import { ClickerPane } from './ClickerPane';
import { StorePane } from './StorePane';
import { Toast } from './Toast';

export const Layout: React.FC = () => {
    return (
        <div className="w-screen h-screen flex flex-col md:flex-row overflow-hidden font-main bg-bg-primary text-text-primary">
            <ClickerPane />
            <StorePane />
            <Toast />
        </div>
    );
};

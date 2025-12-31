import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import MainLayout from './Layouts/MainLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Himpunan Mahasiswa Rekayasa Perancangan Mekanik - UNEJ';

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')).then((module) => {
        const page = module.default;
        page.layout = page.layout || (page => <MainLayout children={page} />);
        return module;
    }),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#EAB308', // brand-yellow
    },
});

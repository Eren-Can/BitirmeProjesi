import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { CustomThemeProvider } from './contexts/CustomThemeContext.tsx';

import 'react-toastify/dist/ReactToastify.css';
import './styles/base.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <CustomThemeProvider>
        <AuthProvider>
            <App />
            <ToastContainer />
        </AuthProvider>
    </CustomThemeProvider>
);

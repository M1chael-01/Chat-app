import { createRoot } from 'react-dom/client';


import './index.css';
import App from './App';


const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App tab="home" />)
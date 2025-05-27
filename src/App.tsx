import React from 'react';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.css';

function App() {
  return (
    <div className="app-container bg-light min-vh-100">
      <Dashboard />
    </div>
  );
}

export default App;
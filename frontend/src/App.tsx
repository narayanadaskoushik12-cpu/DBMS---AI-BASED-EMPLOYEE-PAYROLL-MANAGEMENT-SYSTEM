import React, { useState } from 'react';
import BotanicalLogin from './components/BotanicalLogin';
import BotanicalDashboard from './components/BotanicalDashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string>('employee');

  const handleLogin = (role: string) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#020a06] text-emerald-100 overflow-x-hidden">
      {!isAuthenticated ? (
        <BotanicalLogin onLogin={handleLogin} />
      ) : (
        <BotanicalDashboard userRole={userRole} onLogout={handleLogout} />
      )}
    </div>
  );
}

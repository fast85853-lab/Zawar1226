
import React, { useState } from 'react';
import { 
  Home, 
  User, 
  PlusCircle, 
  Settings, 
  ShieldCheck, 
  Info, 
  Menu, 
  X,
  Globe,
  LogOut
} from 'lucide-react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home Feed', icon: Home },
    { id: 'profile', label: 'My Listings', icon: User },
    { id: 'post', label: 'Post Property', icon: PlusCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  const handleNav = (id: ViewType) => {
    setView(id);
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Globe className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-tight">GlobalHome</h1>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1">
          {isOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Drawer / Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col
      `}>
        <div className="hidden md:flex items-center gap-2 p-6 border-b bg-blue-50">
          <Globe className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">GlobalHome</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id as ViewType)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${currentView === item.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile drawer */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 bg-gray-50 overflow-y-auto h-screen pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;

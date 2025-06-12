
import React from 'react';
import { Card } from '@/components/ui/card';
import { User, Settings, Users, Palette, HelpCircle, LogOut } from 'lucide-react';

const ProfileSidebar = () => {
  const menuItems = [
    { icon: User, label: 'User Profile', active: true },
    { icon: Palette, label: 'Whitelabel Section', active: false },
    { icon: Users, label: 'My Team', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: HelpCircle, label: 'Help & Support', active: false },
    { icon: LogOut, label: 'Logout', active: false },
  ];

  return (
    <Card className="w-64 h-fit">
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Menu</h3>
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                item.active
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </Card>
  );
};

export default ProfileSidebar;


import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, User, LogOut } from 'lucide-react';

const menuItems = [
  { title: 'Головна', url: '/topics', icon: Home },
  { title: 'Словник', url: '/dictionary', icon: BookOpen },
  { title: 'Профіль', url: '/profile', icon: User },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={`${collapsed ? 'w-16' : 'w-64'} border-r-0 bg-white shadow-lg`}>
      <SidebarHeader className="border-b border-gray-100 p-4">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-language-primary to-language-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-lg text-gray-800">LangLearn</span>
          </div>
        )}
        <SidebarTrigger className="absolute top-4 right-4" />
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'hidden' : 'text-gray-500 text-sm font-medium px-2 mb-2'}>
            Навігація
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`rounded-lg mb-1 ${
                      isActive(item.url) 
                        ? 'bg-gradient-to-r from-language-primary to-language-accent text-white' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <button
                      onClick={() => navigate(item.url)}
                      className="w-full flex items-center space-x-3 p-3"
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 p-4">
        {user && (
          <div className="space-y-3">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-language-primary text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Вийти</span>}
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

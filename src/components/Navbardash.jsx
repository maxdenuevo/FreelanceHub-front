import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Menu, 
  Home, 
  HelpCircle, 
  User, 
  Settings, 
  LogOut,
  LayoutDashboard 
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbardash = () => {
  const navigate = useNavigate();

  const navigationLinks = [
    { name: 'Inicio', path: '/', icon: Home },
    { name: '¿Necesitas ayuda?', path: '/contactanos', icon: HelpCircle },
  ];

  const profileMenuItems = [
    { name: 'Perfil', path: '/dashboardpage/perfil', icon: User },
    { name: 'Cambiar contraseña', path: '/ingresarcorreo', icon: Settings },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const getUserInitials = () => {
    const userName = localStorage.getItem('usuario_nombre') || 'U';
    return userName.charAt(0).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary">
      <div className="container flex h-16 items-center px-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="link" 
            className="flex items-center space-x-2 text-white"
            onClick={() => handleNavigation('/')}
          >
            <LayoutDashboard className="h-6 w-6" />
            <span className="font-bold text-xl">FreelanceHub</span>
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex ml-auto">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-4">
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.path}>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-white hover:bg-primary/90"
                    onClick={() => handleNavigation(link.path)}
                  >
                    <link.icon className="h-4 w-4 mr-2" />
                    {link.name}
                  </Button>
                </NavigationMenuItem>
              ))}

              {/* User Profile Dropdown */}
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar>
                        <AvatarFallback className="bg-primary-foreground text-primary">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {profileMenuItems.map((item) => (
                      <DropdownMenuItem
                        key={item.path}
                        className="cursor-pointer"
                        onClick={() => handleNavigation(item.path)}
                      >
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>FreelanceHub</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-4">
                {navigationLinks.map((link) => (
                  <Button
                    key={link.path}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleNavigation(link.path)}
                  >
                    <link.icon className="h-4 w-4 mr-2" />
                    {link.name}
                  </Button>
                ))}
                <DropdownMenuSeparator />
                {profileMenuItems.map((item) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleNavigation(item.path)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbardash;
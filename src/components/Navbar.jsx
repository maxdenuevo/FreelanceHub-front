import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, Home, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navbardash from './Navbardash';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dashboardRoutes = ['/dashboardpage', '/nuevocliente', '/nuevocliente/nuevoproyecto'];
  const isDashboardRoute = dashboardRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  const navigationLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Registrarse', path: '/registro', icon: UserPlus },
    { name: 'Login', path: '/login', icon: LogIn },
  ];

  if (isDashboardRoute) {
    return <Navbardash />;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center space-x-2">
          <Button 
            variant="link" 
            className="flex items-center space-x-2 text-white"
            onClick={() => navigate('/dashboardpage')}
          >
            <LayoutDashboard className="h-6 w-6" />
            <span className="font-bold text-xl">FreelanceHub</span>
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex ml-auto">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.path}>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-white hover:bg-primary/90"
                    onClick={() => navigate(link.path)}
                  >
                    <link.icon className="h-4 w-4 mr-2" />
                    {link.name}
                  </Button>
                </NavigationMenuItem>
              ))}
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
                    onClick={() => navigate(link.path)}
                  >
                    <link.icon className="h-4 w-4 mr-2" />
                    {link.name}
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

export default Navbar;
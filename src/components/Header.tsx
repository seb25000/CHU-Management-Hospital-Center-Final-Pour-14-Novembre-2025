import { Button } from "./ui/button";
import { Menu, User, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <h1 className="text-2xl text-blue-600 tracking-tight">MonSite</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Accueil</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">À propos</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Bell className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Connexion</span>
            </Button>
            
            <Button variant="outline" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Search, User, LogOut, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[99999] bg-gradient-to-b from-background to-transparent">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-primary text-xl md:text-3xl font-bold">
          CRISTÃOFLIX - Canal do Observador
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-muted-foreground transition">
            Início
          </Link>

          <Link to="/videos" className="text-foreground hover:text-muted-foreground transition">
            Catálogo
          </Link>

          <Link to="/meus-livros" className="text-foreground hover:text-muted-foreground transition">
            Meus Livros
          </Link>

          {user && (
            <Link to="/profile" className="text-foreground hover:text-muted-foreground transition">
              Meus Vídeos
            </Link>
          )}
        </div>

        {/* AÇÕES DESKTOP */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Meu Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin')}>
                  Painel Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* BOTÃO HAMBÚRGUER (MOBILE) */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden bg-background shadow-lg px-6 py-4 space-y-4 animate-slideDown">
          <Link onClick={() => setOpen(false)} to="/" className="block text-lg">
            Início
          </Link>

          <Link onClick={() => setOpen(false)} to="/videos" className="block text-lg">
            Catálogo
          </Link>

          <Link onClick={() => setOpen(false)} to="/meus-livros" className="block text-lg">
            Meus Livros
          </Link>

          {user && (
            <Link onClick={() => setOpen(false)} to="/profile" className="block text-lg">
              Meus Vídeos
            </Link>
          )}

          <div className="pt-4 border-t">
            <Button variant="ghost" className="w-full justify-start">
              <Search className="h-5 w-5 mr-2" /> Buscar
            </Button>
          </div>

          {user && (
            <Button
              variant="destructive"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" /> Sair
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
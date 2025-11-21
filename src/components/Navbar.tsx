import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Search, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background to-transparent">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-primary text-3xl font-bold">
            CRISTÃOFLIX - Canal do Observador
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-muted-foreground transition">
              Início
            </Link>

            <Link to="/videos" className="text-foreground hover:text-muted-foreground transition">
              Catálogo
            </Link>

            {/* 🔥 ABA NOVA ADICIONADA AQUI */}
            <Link to="/meus-livros" className="text-foreground hover:text-muted-foreground transition">
              Meus Livros
            </Link>

            {user && (
              <Link to="/profile" className="text-foreground hover:text-muted-foreground transition">
                Meus Vídeos
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
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
          ) : (
            <Button onClick={() => navigate('/auth')} variant="default">
              Entrar
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
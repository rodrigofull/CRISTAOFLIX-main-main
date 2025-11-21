import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { mockVideos } from '@/data/mockVideos';
import { Play, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useHasAccess } from '@/hooks/useHasAccess';
import { useToast } from '@/hooks/use-toast';

export default function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const video = mockVideos.find(v => v.id === id);
  const { hasAccess } = useHasAccess(id || '');

  if (!video) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <p className="text-center text-muted-foreground">Vídeo não encontrado</p>
        </div>
      </div>
    );
  }

  const handlePurchase = () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Simula compra
    const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    purchases.push({
      id: crypto.randomUUID(),
      user_id: user.id,
      video_id: video.id,
      status: 'paid',
      created_at: new Date().toISOString(),
    });
    localStorage.setItem('purchases', JSON.stringify(purchases));
    
    toast({ title: 'Compra realizada com sucesso!' });
    navigate(`/watch/${video.id}`);
  };

  const handleWatch = () => {
    if (hasAccess) {
      navigate(`/watch/${video.id}`);
    } else {
      handlePurchase();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={video.cover_url}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {video.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-primary text-2xl font-bold">
              R$ {video.price.toFixed(2)}
            </span>
            <span className="px-3 py-1 bg-secondary rounded text-secondary-foreground">
              {video.category}
            </span>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            {video.description}
          </p>

          <div className="flex gap-4">
            {hasAccess ? (
              <Button size="lg" onClick={handleWatch} className="gap-2">
                <Play className="h-5 w-5" />
                Assistir Agora
              </Button>
            ) : (
              <Button size="lg" onClick={handlePurchase} className="gap-2">
                <ShoppingCart className="h-5 w-5" />
                Comprar Agora
              </Button>
            )}
          </div>

          {video.preview_url && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Preview</h2>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.preview_url}?rel=0&modestbranding=1`}
                  title="Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

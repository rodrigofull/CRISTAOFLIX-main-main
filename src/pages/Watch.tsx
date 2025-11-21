import { useParams, useNavigate } from 'react-router-dom';
import { useHasAccess } from '@/hooks/useHasAccess';
import { mockVideos } from '@/data/mockVideos';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lock } from 'lucide-react';
import { SecureYoutubePlayer } from '@/components/SecureYoutubePlayer';

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasAccess, isLoading } = useHasAccess(id || '');
  const video = mockVideos.find(v => v.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary text-xl">Carregando...</div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Vídeo não encontrado</p>
          <Button onClick={() => navigate('/')}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-foreground">Acesso Restrito</h1>
          <p className="text-muted-foreground mb-6">
            Você precisa comprar este vídeo para assistir
          </p>
          <Button onClick={() => navigate(`/videos/${id}`)}>
            Ver detalhes e comprar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">{video.title}</h1>
        </div>
      </div>

      <div className="pt-20">
        <div className="aspect-video bg-black">
          <SecureYoutubePlayer videoId={video.youtube_id} />
        </div>

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-2 text-foreground">{video.title}</h2>
          <p className="text-muted-foreground mb-4">{video.category}</p>
          <p className="text-foreground">{video.description}</p>
        </div>
      </div>
    </div>
  );
}

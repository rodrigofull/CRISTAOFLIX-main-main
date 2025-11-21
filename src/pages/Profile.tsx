import { Navbar } from '@/components/Navbar';
import { VideoCard } from '@/components/VideoCard';
import { useAuth } from '@/contexts/AuthContext';
import { mockVideos } from '@/data/mockVideos';
import { User } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
  const purchasedVideos = mockVideos.filter(video =>
    purchases.some((p: any) => p.video_id === video.id && p.user_id === user?.id && p.status === 'paid')
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{user?.name || 'Usuário'}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Meus Vídeos</h2>
          <p className="text-muted-foreground">
            {purchasedVideos.length} vídeo{purchasedVideos.length !== 1 ? 's' : ''} comprado{purchasedVideos.length !== 1 ? 's' : ''}
          </p>
        </div>

        {purchasedVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {purchasedVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              Você ainda não comprou nenhum vídeo
            </p>
            <a href="/videos" className="text-primary hover:underline">
              Explorar catálogo
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

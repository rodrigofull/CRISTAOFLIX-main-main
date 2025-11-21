import { Navbar } from '@/components/Navbar';
import { VideoCarousel } from '@/components/VideoCarousel';
import { mockVideos } from '@/data/mockVideos';
import { Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const featuredVideo = mockVideos[0];

  const categories = {
    'biblia': mockVideos.filter(v => v.category === 'biblia'),
    'Design': mockVideos.filter(v => v.category === 'Design'),
    'videos': mockVideos.filter(v => v.category === 'videos'),
    'Todos': mockVideos,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <img
          src={featuredVideo.cover_url}
          alt={featuredVideo.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground animate-fade-in">
            {featuredVideo.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6 animate-fade-in">
            {featuredVideo.description}
          </p>
          <div className="flex gap-4 animate-fade-in">
            <Button 
              size="lg" 
              onClick={() => navigate(`/videos/${featuredVideo.id}`)}
              className="gap-2"
            >
              <Play className="h-5 w-5" />
              Assistir Agora
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate(`/videos/${featuredVideo.id}`)}
              className="gap-2"
            >
              <Info className="h-5 w-5" />
              Mais Informações
            </Button>
          </div>
        </div>
      </div>


      {/* 💛 CARD DO CATARSE */}
      <div className="container mx-auto px-4 mt-10">
        <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-500/40 rounded-2xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div>
            <h2 className="text-3xl font-bold text-yellow-500 mb-3">
              Apoie Nossa Comunidade Cristã
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Ajude a manter este projeto no ar e faça parte da nossa missão.
              Torne-se um apoiador oficial no Catarse.
            </p>
          </div>

          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-6 rounded-xl text-lg shadow-lg"
            onClick={() => window.open("https://www.catarse.me/comunidade_crista_do_observador_8750?ref=user_contributed", "_blank")}
          >
            Apoiar no Catarse 💛
          </Button>
        </div>
      </div>


      {/* Carousels */}
      <div className="container mx-auto px-4 py-8 mt-10 relative z-10">
        {Object.entries(categories).map(([category, videos]) => (
          <VideoCarousel key={category} title={category} videos={videos} />
        ))}
      </div>
    </div>
  );
}
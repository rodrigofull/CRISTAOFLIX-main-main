import { Link } from 'react-router-dom';
import { Video } from '@/types/video';
import { Play } from 'lucide-react';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link 
      to={`/videos/${video.id}`} 
      className="group relative block overflow-hidden rounded-md transition-transform hover:scale-105 hover:z-10"
    >
      <img
        src={video.cover_url}
        alt={video.title}
        className="w-full aspect-video object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-foreground mb-1">{video.title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{video.category}</span>
            <span className="text-primary font-bold">R$ {video.price.toFixed(2)}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-foreground">
            <Play className="h-4 w-4" />
            <span>Assistir agora</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

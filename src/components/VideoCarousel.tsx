import { Video } from '@/types/video';
import { VideoCard } from './VideoCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useRef } from 'react';

interface VideoCarouselProps {
  title: string;
  videos: Video[];
}

export function VideoCarousel({ title, videos }: VideoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-foreground">{title}</h2>
      <div className="relative group">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition bg-background/80 hover:bg-background"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((video) => (
            <div key={video.id} className="flex-none w-[300px]">
              <VideoCard video={video} />
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition bg-background/80 hover:bg-background"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}

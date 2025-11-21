import { useEffect, useRef } from 'react';

interface SecureYoutubePlayerProps {
  videoId: string;
}

export function SecureYoutubePlayer({ videoId }: SecureYoutubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Previne clique direito
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      if (container) {
        container.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black"
      style={{ userSelect: 'none' }}
    >
      {/* YouTube Iframe com parâmetros de segurança */}
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1&rel=0&fs=0&disablekb=1&autoplay=1`}
        title="Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="border-0"
        style={{ pointerEvents: 'auto' }}
      />
      
      {/* Overlay invisível para proteger contra cópia de link */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 1,
          background: 'transparent'
        }}
      />
    </div>
  );
}

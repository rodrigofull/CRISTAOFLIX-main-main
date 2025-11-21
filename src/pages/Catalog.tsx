import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { VideoCard } from '@/components/VideoCard';
import { mockVideos } from '@/data/mockVideos';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Catalog() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = ['all', ...new Set(mockVideos.map(v => v.category))];

  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase()) ||
                         video.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || video.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Catálogo de Vídeos</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder="Buscar vídeos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:flex-1"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="md:w-[200px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.slice(1).map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Nenhum vídeo encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}

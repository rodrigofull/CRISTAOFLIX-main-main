import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Admin() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    cover_url: '',
    youtube_id: '',
    preview_url: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Vídeo cadastrado!',
      description: 'O vídeo foi adicionado ao catálogo com sucesso.',
    });
    setFormData({
      title: '',
      description: '',
      category: '',
      price: '',
      cover_url: '',
      youtube_id: '',
      preview_url: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Painel Administrativo</h1>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Cadastrar Novo Vídeo</CardTitle>
            <CardDescription>
              Adicione um novo vídeo ao catálogo da plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cover_url">URL da Capa</Label>
                <Input
                  id="cover_url"
                  type="url"
                  value={formData.cover_url}
                  onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                  required
                />
              </div>

              <div>
                <Label htmlFor="youtube_id">YouTube Video ID</Label>
                <Input
                  id="youtube_id"
                  value={formData.youtube_id}
                  onChange={(e) => setFormData({ ...formData, youtube_id: e.target.value })}
                  placeholder="dQw4w9WgXcQ"
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  ID do vídeo no YouTube (não listado)
                </p>
              </div>

              <div>
                <Label htmlFor="preview_url">Preview Video ID (opcional)</Label>
                <Input
                  id="preview_url"
                  value={formData.preview_url}
                  onChange={(e) => setFormData({ ...formData, preview_url: e.target.value })}
                  placeholder="dQw4w9WgXcQ"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  ID do vídeo preview/trailer no YouTube
                </p>
              </div>

              <Button type="submit" className="w-full">
                Cadastrar Vídeo
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

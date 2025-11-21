import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useHasAccess(videoId: string) {
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setHasAccess(false);
      setIsLoading(false);
      return;
    }

    // Simula verificação de compra via localStorage
    const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    const hasPurchased = purchases.some(
      (p: any) => p.video_id === videoId && p.user_id === user.id && p.status === 'paid'
    );
    
    setHasAccess(hasPurchased);
    setIsLoading(false);
  }, [user, videoId]);

  return { hasAccess, isLoading };
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to $10K dashboard
    router.push('/dashboard-10k');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <div className="text-4xl mb-4">🎯</div>
        <p className="text-lg text-slate-400">Loading $10K Mission Dashboard...</p>
      </div>
    </div>
  );
}

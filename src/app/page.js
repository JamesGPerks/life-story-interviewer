'use client';

import InterviewContainer from '@/components/Interview/InterviewContainer.js';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Life Story Interview
      </h1>
      <InterviewContainer />
    </main>
  );
}
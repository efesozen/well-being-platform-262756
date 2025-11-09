'use client';

import { useContents } from '@/features/contents/hooks/use-contents';

export default function ContentLibraryPage() {
  const { data: contents, isLoading } = useContents();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Content Library</h1>
      <p className="text-muted-foreground mb-6">A library of well-being resources and articles.</p>
      
      <div className="grid gap-4">
        {contents?.map((content: any) => (
          <div key={content.id} className="border rounded p-4">
            <pre>{JSON.stringify(content, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

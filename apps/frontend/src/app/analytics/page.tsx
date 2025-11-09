'use client';

import { useUserDatas } from '@/features/user-datas/hooks/use-user-datas';

export default function AnalyticsDashboardPage() {
  const { data: userDatas, isLoading } = useUserDatas();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <p className="text-muted-foreground mb-6">Dashboard for users to view their data analytics and insights.</p>
      
      <div className="grid gap-4">
        {userDatas?.map((userData: any) => (
          <div key={userData.id} className="border rounded p-4">
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

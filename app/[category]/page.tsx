import React from 'react';
import URLs from '@/lib/urls'; 

type Props = {
  params: Promise<{ category: string }>;
};

async function getAnyCategoryData(id: string) {
  try {
    
    let res = await fetch(`${URLs.API.getMainCategory}${id}`, { cache: 'no-store' });
    

    if (!res.ok) {
      res = await fetch(`${URLs.API.getCategory}${id}`, { cache: 'no-store' });
    }

    if (!res.ok) {
      res = await fetch(`${URLs.API.listSubCategory}${id}`, { cache: 'no-store' });
    }

    if (!res.ok) return null;
    const result = await res.json();
    return result.data || result; 
  } catch (error) {
    return null;
  }
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const decodedValue = decodeURIComponent(resolvedParams.category);
  const [_, id] = decodedValue.split('=');

  if (!id) return null;

  const data = await getAnyCategoryData(id);

  const getImageUrl = (path: string | undefined) => {
    if (!path) return "";
    const baseUrl = URLs.FILEURL.replace(/\/$/, "");
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  };

  return (
    <div className="w-full py-12 flex justify-center bg-gray-50 min-h-screen">
   
      <div className="relative h-[650px] max-w-sm w-full rounded-2xl overflow-hidden bg-white shadow-2xl border border-gray-100">
        {data?.image ? (
          <img 
            src={getImageUrl(data.image)} 
            alt="Category Image" 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
             <p>No Image Found</p>
          </div>
        )}
      </div>
    </div>
  );
}
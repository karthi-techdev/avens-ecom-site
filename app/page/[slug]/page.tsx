"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const PageDetails = () => {
  const params = useParams();

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/v1/admin/page?page=1&limit=50"
        );

        const result = await res.json();

        const pages = result.data;

        const page = pages.find(
          (item: any) => item.slug === slug
        );

        setPageData(page);

      } catch (error) {
        console.error("Page fetch error:", error);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  if (!pageData) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full bg-white">

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12">

        <h1 className="text-3xl font-bold mb-8">
          {pageData.name}
        </h1>

        <div
          className="prose max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: pageData.description,
          }}
        />

      </div>

    </div>
  );
};

export default PageDetails;
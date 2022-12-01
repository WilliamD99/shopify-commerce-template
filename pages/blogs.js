import React, { useEffect, useState } from "react";
import { QueryClient, dehydrate, useQueries } from "@tanstack/react-query";
import { articleGet, blogGetAll } from "../lib/serverRequest";
import Navigator from "../components/Blog/blog/navigator";

import { useRouter } from "next/router";
import ArticleList from "../components/Blog/article/list";

export default function Blogs({ name }) {
  const router = useRouter();
  const routerQuery = router.query;
  const [nameQuery, setNameQuery] = useState("");

  const data = useQueries({
    queries: [
      {
        queryKey: ["All blog title"],
        queryFn: () => blogGetAll(),
        staleTime: 1000 * 60 * 60 * 24,
      },
      {
        queryKey: ["Article", nameQuery],
        queryFn: () => articleGet({ blog_title: nameQuery }),
        staleTime: 1000 * 60 * 60 * 24,
      },
    ],
  });

  useEffect(() => {
    setNameQuery(routerQuery.name);
  }, [routerQuery.name]);

  return (
    <div id="blog">
      <div className="relative h-128 w-screen bg-black flex flex-col justify-center items-center space-y-5">
        <p className="text-center uppercase text-white text-6xl font-bold">
          Ecommerce Template
        </p>
        <p className="text-center uppercase text-white text-6xl font-bold">
          Newsroom
        </p>
        <Navigator data={data[0].data.data} />
      </div>
      <ArticleList isLoading={data[1].isLoading} data={data[1].data?.data} />
    </div>
  );
}

const queryClient = new QueryClient();
export async function getServerSideProps({ query, res }) {
  let { name } = query;
  name = name ? name : "";
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=59"
  );

  await queryClient.prefetchQuery(["All blog title"], () => blogGetAll(), {
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      name: name,
    },
  };
}

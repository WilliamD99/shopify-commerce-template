import React from 'react'
import { useRouter } from 'next/router'
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { singleArticleGet } from '../../../lib/serverRequest';

export default function Article({ handle, name }) {
    const router = useRouter()

    const { data } = useQuery(["Article", handle], () => singleArticleGet({ blog_handle: name, article_handle: handle }))
    console.log(data)

    return (
        <>
            <div>Article</div>
            <div
                className=""
                dangerouslySetInnerHTML={{ __html: data.data.blog.articleByHandle.contentHtml }}
            ></div>
        </>
    )
}


const queryClient = new QueryClient();
export async function getServerSideProps({ query, res }) {
    let { name, handle } = query;
    name = name ? name : "";

    await queryClient.prefetchQuery(["Article", handle], () => singleArticleGet({ blog_handle: name, article_handle: handle }), {
        staleTime: 1000 * 60 * 60 * 24,
    });

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=30, stale-while-revalidate=59"
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            handle: handle,
            name: name
        },
    };
}
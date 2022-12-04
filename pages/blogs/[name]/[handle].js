import React from 'react'
import { useRouter } from 'next/router'
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { singleArticleGet } from '../../../lib/serverRequest';
import Progress from '../../../components/Blog/progress';
import Image from '../../../components/common/Image'
import { AiOutlineTwitter, AiFillFacebook, AiFillLinkedin, AiFillMail } from 'react-icons/ai'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function Article({ handle, name }) {
    const router = useRouter()

    const { data } = useQuery(["Article", handle], () => singleArticleGet({ blog_handle: name, article_handle: handle }))
    console.log(data)

    if (!data?.data.blog) {
        return <>
            <p>Couldn't find this article</p>
        </>
    }

    return (
        <div id="article" className='lg:grid lg:grid-cols-3'>
            <Progress />
            <div className='hidden fixed right-20 top-32 lg:flex flex-col space-y-4'>
                <div className='bg-sky-50 px-2 py-2 rounded-full'>
                    <AiOutlineTwitter className='text-xl' />
                </div>
                <div className='bg-sky-50 px-2 py-2 rounded-full'>
                    <AiFillFacebook className='text-xl' />
                </div>
                <div className='bg-sky-50 px-2 py-2 rounded-full'>
                    <AiFillLinkedin className='text-xl' />
                </div>
                <div className='bg-sky-50 px-2 py-2 rounded-full'>
                    <AiFillMail className='text-xl' />
                </div>
            </div>
            <div></div>

            <div className='flex flex-col justify-center items-center mt-10 px-5'>
                <p className='text-2xl lg:text-3xl font-bold text-center'>{data.data.blog.articleByHandle.title}</p>
                <div className='flex flex-row space-x-2 mt-2'>
                    <p className='text-sm lg:text-base font-semibold'>{`Written By ${data.data.blog.articleByHandle.authorV2?.name}`}</p>
                    <span>&#x2022;</span>
                    <p className='text-sm lg:text-base '>{new Date(data.data.blog.articleByHandle.publishedAt).toLocaleDateString()}</p>
                </div>
                <div className='w-full h-72 lg:h-96 mt-5 lg:mt-10'>
                    <div className='relative w-full h-full pt-10'>
                        <Image layout="fill" src={data.data.blog.articleByHandle.image.url} />
                    </div>
                </div>
                <div
                    className="article_content pt-10 flex flex-col items-center justify-center space-y-5"
                    dangerouslySetInnerHTML={{ __html: data.data.blog.articleByHandle.contentHtml }}
                ></div>

                <div className='relative lg:w-11/12 flex flex-col lg:flex-row bg-slate-100 px-5 py-8 mt-10 rounded-md'>
                    <div className='w-full lg:w-8/12'>
                        <p className='mb-4'>Subscribe now to here more news from us</p>
                        <form className='flex flex-row' onSubmit={() => console.log('Submitted')}>
                            <TextField type="email" size="small" required placeholder='Email Address' />
                            <Button variant="outlined" type="submit" className='bg-black text-white border-black rounded-l-none rounded-r-lg'>Subscribe</Button>
                        </form>
                    </div>
                    <div className='w-full lg:w-4/12'></div>
                </div>

                <div className='flex flex-col md:flex-row justify-between px-4 py-4 bg-slate-100 items-center lg:w-8/12 my-10 rounded-lg'>
                    <p className='text-sm text-center mb-2 lg:mb-0'>Like what you see? Share with a friend.</p>
                    <div className='flex flex-row space-x-3'>
                        <div className='bg-sky-100 px-2 py-2 rounded-full'>
                            <AiOutlineTwitter className='text-lg' />
                        </div>
                        <div className='bg-sky-100 px-2 py-2 rounded-full'>
                            <AiFillFacebook className='text-lg' />
                        </div>
                        <div className='bg-sky-100 px-2 py-2 rounded-full'>
                            <AiFillLinkedin className='text-lg' />
                        </div>
                        <div className='bg-sky-100 px-2 py-2 rounded-full'>
                            <AiFillMail className='text-lg' />
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
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
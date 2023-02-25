import axios from 'axios';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Posts from '../components/posts'



export default function Home({ posts, media }) {
  // useEffect(() => {
  //   axios.get('https://emoha.com/blogs/wp-json/wp/v2/posts', {
  //     headers: {
  //       "Access-Control-Allow-Origin": "*"
  //     }
  //   }).then((res) => {
  //     console.log(res);
  //     setData(res)
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // })
  return (
    <>
      <Head>
        <title>Create Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ width: '100vw !important', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        {
          posts.map((data) => {
            return <Posts key={data.id} posts={posts} media={media} id={data.id} />
          })
        }
      </div>
    </>
  )
}


export async function getStaticProps() {
  const res = await fetch("https://emoha.com/blogs/wp-json/wp/v2/posts");
  const posts = await res.json();
  const resp = await fetch("https://emoha.com/blogs/wp-json/wp/v2/media");
  const media = await resp.json();

  return {
    props: {
      posts,
      media
    },
    // revalidate: 10,
  };
}
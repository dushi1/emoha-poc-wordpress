import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import Posts from '../components/posts'


export default function Home({ posts }) {
  const search = useRef('')
  const [data, setData] = useState(posts)
  const onSubmit = (e) => {
    fetch(`/api/search/${search.current.value}`)
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        setData(data)
      });
    e.preventDefault()
  }
  return (
    <>
      <Head>
        <title>Emoha</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ width: '100%', position: 'fixed', top: 0, height: 100, boxShadow: '10px 5px 5px black', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <img src="https://emoha.com/blogs/wp-content/uploads/2022/02/logo-red.svg" width={160} height={80} />
          <form onSubmit={onSubmit}>
            <input style={{ height: 50, padding: 20, fontSize: 20 }} placeholder="Search...." ref={search} />
          </form>
        </div>
      </div>
      <div style={{ width: '100vw !important', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            {
              data.map((obj) => {
                return <Posts key={obj.id} posts={obj} media={obj.featured_media} id={obj.id} />
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}


export async function getStaticProps() {

  const res = await fetch(`https://emoha.com/blogs/wp-json/wp/v2/posts?per_page=100&page=1`);
  const posts = await res.json();
  return {
    props: {
      posts
    },
    // revalidate: 10,
  };
}
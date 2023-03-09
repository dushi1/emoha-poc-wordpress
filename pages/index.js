import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import Posts from '../components/posts'
import CatList from '../components/categoriesList'
import Carousel from 'react-elastic-carousel';

export default function Home({ posts, health }) {
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
      <div style={{ width: '100%', position: 'fixed', top: 0, height: 100, zIndex: 200, boxShadow: '10px 5px 5px black', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <img src="https://emoha.com/blogs/wp-content/uploads/2022/02/logo-red.svg" width={160} height={80} />
          <form onSubmit={onSubmit}>
            <input style={{ height: 50, padding: 20, fontSize: 20 }} placeholder="Search...." ref={search} />
          </form>
        </div>
      </div>

      <div style={{ width: '100vw !important', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 120 }}>
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <div className='strip'>
            <div className='trend'>
              <h4>Trending</h4>
            </div>
            <div className='title-container'>
              <h4 style={{ margin: '20px 0' }} dangerouslySetInnerHTML={{ __html: posts[0]?.title?.rendered }} />
            </div>
          </div>
          <h3>Today's Feature News</h3>
          <Carousel
            itemsToShow={3}
            itemsToScroll={3}
            showEmptySlots={false}
          >
            {
              data.map((obj) => {
                return <Posts key={obj.id} posts={obj} media={obj.featured_media} id={obj.id} />
              })
            }
          </Carousel>

          <h3>Health</h3>
          <CatList posts={health} />

        </div>
      </div>
    </>
  )
}


export async function getStaticProps() {

  const res = await fetch(`https://emoha.com/blogs/wp-json/wp/v2/posts`);
  const posts = await res.json();
  const resHealth = await fetch(`https://emoha.com/blogs//wp-json/wp/v2/posts?categories=10`);
  const health = await resHealth.json();
  return {
    props: {
      posts,
      health
    },
    // revalidate: 10,
  };
}
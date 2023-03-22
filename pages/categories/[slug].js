import React from "react";
import Head from "next/head";
import Posts from "../../components/posts";

const Categoreies = ({ posts, postImages }) => {
  const onSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Head>
        <title>Emoha</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          height: 100,
          zIndex: 200,
          boxShadow: "10px 5px 5px black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <img
            src="https://emoha.com/blogs/wp-content/uploads/2022/02/logo-red.svg"
            width={160}
            height={80}
          />
          <form onSubmit={onSubmit}>
            <input
              style={{ height: 50, padding: 20, fontSize: 20 }}
              placeholder="Search...."
            />
          </form>
        </div>
      </div>

      <div
        style={{
          width: "100vw !important",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 120,
        }}
      >
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <h3>Categories</h3>
          <div className="grid-cat">
            {posts.length === 0 ? (
              <div>No posts found!!!</div>
            ) : (
              posts.map((obj) => {
                return (
                  <Posts
                    key={obj.id}
                    posts={obj}
                    media={obj.featured_media}
                    img={postImages}
                    id={obj.id}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const categories = await fetch(
    `https://emoha.com/blogs//wp-json/wp/v2/categories?per_page=100`
  );
  const categoriesArray = await categories.json();
  const array = categoriesArray.map((data) => {
    return { params: { slug: data.slug } };
  });
  return {
    paths: array,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://emoha.com/blogs/wp-json/wp/v2/categories?slug=${params.slug}`
  );
  const category = await res.json();
  const postsQuery = await fetch(
    `https://emoha.com/blogs/wp-json/wp/v2/posts?categories=${category[0].id}`
  );
  const posts = await postsQuery.json();
  const postImages = posts.map(async (obj) => {
    const response = await fetch(
      `https://emoha.com/blogs/wp-json/wp/v2/media/${obj?.featured_media}`
    );
    return response.json();
  });
  return {
    props: {
      posts,
      postImages: await Promise.all(postImages),
    },
  };
}

export default Categoreies;

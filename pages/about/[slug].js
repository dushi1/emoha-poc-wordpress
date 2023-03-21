import axios from "axios";
import moment from "moment";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function About({
  posts,
  postImages,
  // allPosts,
  tagsArray,
  commentsArray,
  categoriesArray,
}) {
  // useEffect(() => {
  //   const obj = {};
  //   allPosts.flat(9).forEach((data) => {
  //     obj[moment(data.date).format("MMMM YYYY")] = data.date;
  //   });
  //   const neww = Object.keys(obj).sort((a, b) =>
  //     moment(a.date, "DD-MM-YYYY").diff(moment(b.date, "DD-MM-YYYY"))
  //   );
  //   setArchive(neww);
  // });
  // const [archive, setArchive] = useState([]);
  const [toggle, setToggle] = useState(1);
  console.log(posts[0]?.yoast_head_json);
  return (
    <>
      <Head>
        {Object.keys(posts[0]?.yoast_head_json).map((data) => {
          if (data === "title") {
            return <title>{posts[0]?.yoast_head_json[data]}</title>;
          }
          if (data === "description") {
            return (
              <meta
                name="description"
                content={posts[0]?.yoast_head_json[data]}
              />
            );
          }
          if (data === "robots") {
            let content = "";
            const robo = Object.keys(posts[0]?.yoast_head_json[data]).map(
              (obj) => {
                content += posts[0]?.yoast_head_json[data][obj] + ", ";
              }
            );

            return <meta name="robots" content={content} />;
          }
          if (
            typeof posts[0]?.yoast_head_json[data] === "object" ||
            Array.isArray(posts[0]?.yoast_head_json[data])
          ) {
            if (data === "twitter_misc") {
              const twitter = Object.keys(posts[0]?.yoast_head_json[data]).map(
                (obj, i) => {
                  return (
                    <>
                      <meta name={`twitter:label${i + 1}`} content={obj} />
                      <meta
                        name={`twitter:data${i + 1}`}
                        content={posts[0]?.yoast_head_json[data][obj]}
                      />
                    </>
                  );
                }
              );
              return twitter;
            }
            if (data === "og_image") {
              const ogimage = Object.keys(
                posts[0]?.yoast_head_json[data][0]
              ).map((obj) => {
                return (
                  <meta
                    name={`og:image:${obj}`}
                    content={posts[0]?.yoast_head_json[data][0][obj]}
                  />
                );
              });
              return ogimage;
            }
            return;
          }
          return (
            <meta
              name={data.replace("_", ":")}
              content={posts[0]?.yoast_head_json[data]}
            />
          );
        })}
      </Head>
      <div
        style={{
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <div className="grid">
            <div style={{ paddingRight: 10 }}>
              <img src={`${postImages?.link}`} width="100%" height={500} />
              <h1
                style={{ margin: "20px 0" }}
                dangerouslySetInnerHTML={{ __html: posts[0]?.title?.rendered }}
              />
              <div
                style={{ margin: "20px 0", paddingBottom: "50px" }}
                dangerouslySetInnerHTML={{
                  __html: posts[0]?.content?.rendered,
                }}
              />
            </div>
            <div>
              <div className="grid-container">
                <div className="grid-button">
                  <p>Popular</p>
                </div>
                <div className="grid-button" onClick={() => setToggle(1)}>
                  <p>Comments</p>
                </div>
                <div className="grid-button" onClick={() => setToggle(2)}>
                  <p>Tags</p>
                </div>
              </div>
              {toggle === 1
                ? commentsArray.map((data) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderColor: "black",
                        }}
                      >
                        <p style={{ padding: 0, margin: 0 }}>
                          {data.author_name}
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data?.content?.rendered,
                          }}
                        />
                      </div>
                    );
                  })
                : tagsArray.flat(11).map((data) => {
                    return (
                      <a className="tags" href={`tags/${data.slug}`}>
                        {data.name}
                      </a>
                    );
                  })}
              <h3>Categories</h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {categoriesArray.map((data) => {
                  return (
                    <a href={`categories/${data.slug}`} className="categories">
                      {data.name}
                    </a>
                  );
                })}
              </div>
              {/* <h3>Archive</h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {archive.map((data) => {
                return (
                  <a
                    href={`archives/${data.split(" ")[0]}-${
                      data.split(" ")[1]
                    }`}
                    className="categories"
                  >
                    {data}
                  </a>
                );
              })}
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const tagsAll = Array.from({ length: 9 }).map(async (obj, i) => {
    const response = await fetch(
      `https://emoha.com/blogs/wp-json/wp/v2/posts?per_page=100&page=${i + 1}`
    );
    return response.json();
  });
  const tagsArray = await Promise.all(tagsAll);
  const array = tagsArray.flat(9).map((data) => {
    return { params: { slug: data?.slug } };
  });

  return {
    paths: array,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://emoha.com/blogs/wp-json/wp/v2/posts?slug=${params.slug}`
  );
  const posts = await res.json();

  const response = await fetch(
    `https://emoha.com/blogs/wp-json/wp/v2/media/${posts[0]?.featured_media}`
  );
  const postImages = await response.json();
  const tagsAll = Array.from({ length: 11 }).map(async (_, i) => {
    const response = await fetch(
      `https://emoha.com/blogs//wp-json/wp/v2/tags?per_page=100&page=${i + 1}`
    );
    return response.json();
  });

  const comments = await fetch(
    `https://emoha.com/blogs//wp-json/wp/v2/comments`
  );
  const commentsArray = await comments.json();

  const categories = await fetch(
    `https://emoha.com/blogs//wp-json/wp/v2/categories?per_page=100`
  );
  const categoriesArray = await categories.json();

  // const allPostsApi = Array.from({ length: 9 }).map(async (_, i) => {
  //   const res = await axios.get(
  //     `https://emoha.com/blogs/wp-json/wp/v2/posts?per_page=100&page=${i + 1}`
  //   );
  //   return res.data;
  // });

  return {
    props: {
      posts,
      postImages,
      // allPosts: await Promise.all(allPostsApi),
      tagsArray: await Promise.all(tagsAll),
      commentsArray,
      categoriesArray,
    },
  };
}

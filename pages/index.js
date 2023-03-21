import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Posts from "../components/posts";
import CatList from "../components/categoriesList";
import Carousel from "react-elastic-carousel";
import axios from "axios";
import moment from "moment";

export default function Home({
  posts,
  health,
  images,
  catimages,
  eye,
  fit,
  fitimages,
  eyeimages,
  tagsArray,
  commentsArray,
  categoriesArray,
  allPosts,
  metatag,
}) {
  const search = useRef("");
  useEffect(() => {
    const obj = {};
    allPosts.flat(9).forEach((data) => {
      obj[moment(data.date).format("MMMM YYYY")] = data.date;
    });
    const neww = Object.keys(obj).sort((a, b) =>
      moment(a.date, "DD-MM-YYYY").diff(moment(b.date, "DD-MM-YYYY"))
    );
    setArchive(neww);
  }, []);
  const [archive, setArchive] = useState([]);
  const [data, setData] = useState([]);
  const [postImages, setPostImages] = useState(images);
  const [toggle, setToggle] = useState(1);

  const onSubmit = async (e) => {
    if (search.current.value === "") {
      setData([]);
    } else {
      fetch(`/api/search/${search.current.value}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setData(data);
        });
    }
    e.preventDefault();
  };
  console.log(metatag);
  return (
    <>
      <Head>
        {Object.keys(metatag.json).map((data) => {
          if (data === "title") {
            return <title>{metatag?.json[data]}</title>;
          }
          if (data === "canonical") {
            return <link rel={data} href={metatag?.json[data]} />;
          }
          if (data === "description") {
            return <meta name="description" content={metatag?.json[data]} />;
          }
          if (data === "robots") {
            let content = "";
            Object.keys(metatag?.json[data]).map((obj) => {
              content += metatag?.json[data][obj] + ", ";
            });

            return <meta name="robots" content={content} />;
          }
          if (
            typeof metatag?.json[data] === "object" ||
            Array.isArray(metatag?.json[data])
          ) {
            if (data === "twitter_misc") {
              const twitter = Object.keys(metatag?.json[data]).map((obj) => {
                return <meta name={obj} content={metatag?.json[data][obj]} />;
              });
              return twitter;
            }
            if (data === "og_image") {
              const ogimage = Object.keys(metatag?.json[data][0]).map((obj) => {
                return (
                  <meta name={obj} content={metatag?.json[data][0][obj]} />
                );
              });
              return ogimage;
            }
            return;
          }
          return (
            <meta name={data.replace("_", ":")} content={metatag?.json[data]} />
          );
        })}
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
              ref={search}
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
          <div className="strip">
            <div className="trend">
              <h4>Trending</h4>
            </div>
            <div className="title-container">
              <h4
                style={{ margin: "20px 0" }}
                dangerouslySetInnerHTML={{ __html: metatag?.title?.rendered }}
              />
            </div>
          </div>
          <h3>
            {data.length !== 0 ? "Search Result" : "Today's Feature News"}
          </h3>
          {data.length !== 0 ? (
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
                  {data.length === 0 ? (
                    <div>No posts found!!!</div>
                  ) : (
                    data.map((obj) => {
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
          ) : (
            <Carousel itemsToShow={3} itemsToScroll={3} showEmptySlots={false}>
              {posts.map((obj) => {
                return (
                  <Posts
                    key={obj.id}
                    posts={obj}
                    media={obj.featured_media}
                    img={postImages}
                    id={obj.id}
                  />
                );
              })}
            </Carousel>
          )}

          <div className="grid">
            <div>
              <h3>Health</h3>
              <CatList posts={health} img={catimages} />

              <h3>Fitness</h3>
              <CatList posts={fit} img={fitimages} />

              <h3>Eyecare</h3>
              <CatList posts={eye} img={eyeimages} />
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
              <h3>Archive</h3>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`https://emoha.com/blogs/wp-json/wp/v2/posts`);
  const posts = await res.json();
  const postimages = posts.map(async (obj) => {
    const response = await fetch(
      `https://emoha.com/blogs/wp-json/wp/v2/media/${obj?.featured_media}`
    );
    return response.json();
  });

  const resHealth = await fetch(
    `https://emoha.com/blogs//wp-json/wp/v2/posts?categories=10`
  );
  const health = await resHealth.json();
  const catimages = health.map(async (obj) => {
    const response = await fetch(
      `https://emoha.com/blogs/wp-json/wp/v2/media/${obj?.featured_media}`
    );
    return response.json();
  });

  const eyecare = await fetch(
    `https://emoha.com/blogs//wp-json/wp/v2/posts?categories=27`
  );
  const eye = await eyecare.json();
  const eyeimages = eye.map(async (obj) => {
    const response = await fetch(
      `https://emoha.com/blogs/wp-json/wp/v2/media/${obj?.featured_media}`
    );
    return response.json();
  });

  const fitness = await fetch(
    `https://emoha.com/blogs//wp-json/wp/v2/posts?categories=18`
  );
  const fit = await fitness.json();
  const fitimages = fit.map(async (obj) => {
    const response = await fetch(
      `https://emoha.com/blogs/wp-json/wp/v2/media/${obj?.featured_media}`
    );
    return response.json();
  });

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

  const allPostsApi = Array.from({ length: 9 }).map(async (_, i) => {
    const res = await axios.get(
      `https://emoha.com/blogs/wp-json/wp/v2/posts?per_page=100&page=${i + 1}`
    );
    return res.data;
  });

  const meta = await fetch(
    `https://emoha.com/blogs/wp-json/yoast/v1/get_head?url=https://emoha.com/blogs`
  );
  const jsonResp = await meta.json();

  return {
    props: {
      posts,
      health,
      eye,
      fit,
      images: await Promise.all(postimages),
      catimages: await Promise.all(catimages),
      fitimages: await Promise.all(fitimages),
      eyeimages: await Promise.all(eyeimages),
      tagsArray: await Promise.all(tagsAll),
      commentsArray,
      categoriesArray,
      allPosts: await Promise.all(allPostsApi),
      metatag: jsonResp,
    },
  };
}

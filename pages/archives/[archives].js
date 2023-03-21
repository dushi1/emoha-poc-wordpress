import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Posts from "../../components/posts";
import axios from "axios";
import moment from "moment";

const Archives = ({ posts, postImages }) => {
  const router = useRouter();
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

// export async function getStaticPaths() {
//   const allPostsApi = Array.from({ length: 9 }).map(async (_, i) => {
//     const res = await axios.get(
//       `https://emoha.com/blogs/wp-json/wp/v2/posts?per_page=100&page=${i + 1}`
//     );
//     return res.data;
//   });
//   const allPosts = await Promise.all(allPostsApi);
//   const obj = {};
//   allPosts.flat(9).forEach((data) => {
//     obj[moment(data.date).format("MMMM YYYY")] = data.date;
//   });
//   const neww = Object.keys(obj).sort((a, b) =>
//     moment(a.date, "DD-MM-YYYY").diff(moment(b.date, "DD-MM-YYYY"))
//   );
//   const array = neww.map((data) => {
//     return {
//       params: { archives: `${data.split(" ")[0]}-${data.split(" ")[1]}` },
//     };
//   });
//   return {
//     paths: array,
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params }) {
  const param = params.archives;
  const month = moment().month(param.split("-")[0]).format("M");
  const dateRange1 = moment()
    .set({
      month: month - 1,
      year: param.split("-")[1],
      date: 1,
    })
    .startOf("day")
    .format("YYYY-MM-DDT00:00:00");
  const newDate = dateRange1;
  const dateRange2 = moment(newDate)
    .add(1, "M")
    .startOf("day")
    .format("YYYY-MM-DDT00:00:00");

  const res = await fetch(
    `https://emoha.com/blogs/wp-json/wp/v2/posts?before=${dateRange2}&after=${dateRange1}`
  );

  const postdates = await res.json();

  const postImages = postdates.map(async (obj) => {
    const response = await fetch(
      `https://emoha.com/blogs/wp-json/wp/v2/media/${obj?.featured_media}`
    );
    return response.json();
  });
  return {
    props: { posts: postdates, postImages: await Promise.all(postImages) },
  };
}

export default Archives;

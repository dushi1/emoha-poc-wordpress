import React, { useEffect, useState } from 'react'

export default function About() {
    const [pic, setPic] = useState(null)
    const [posts, setposts] = useState({})
    useEffect(() => {
        const effect = async () => {
            const id = window.location.href.split('/').at(-1)
            fetch(`/api/posts/${id}`)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data, 'blogdata-=-=-=-=-=');
                    setposts(data)
                    fetch(`/api/media/${data?.featured_media}`)
                        .then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            setPic(data)
                        });
                });
        }
        effect()
    }, [])
    return (
        <div style={{ width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                <img src={`${pic?.link}`} width='100%' height={500} />
                <h1 style={{ margin: '20px 0' }} dangerouslySetInnerHTML={{ __html: posts?.title?.rendered }} />
                <div style={{ margin: '20px 0', paddingBottom: '50px' }} dangerouslySetInnerHTML={{ __html: posts?.content?.rendered }} />
            </div>
        </div>
    )
}

// export async function getStaticPaths() {
//     return {
//         paths: [
//             // String variant:
//             '/about/slug',
//             // Object variant:
//             { params: { slug: '9501' } },
//         ],
//         fallback: true,
//     }
// }

// export async function getStaticProps({ params }) {
//     const res = await fetch(`https://emoha.com/blogs/wp-json/wp/v2/posts/${params.slug}`)
//     const posts = await res.json()
//     return { props: { posts } }
// }
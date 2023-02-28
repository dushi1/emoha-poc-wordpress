import React, { useEffect, useState } from 'react'

export default function About({ posts }) {
    const [pic, setPic] = useState(null)
    useEffect(() => {
        const effect = async () => {
            fetch(`/api/media/${posts?.featured_media}`)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    setPic(data)
                });
        }
        effect()
    }, [])
    return (
        <div style={{ width: "100%", maxWidth: '1200px', margin: '50px' }}>
            <img src={pic?.link} width={500} height={500} />
            <h1 style={{ margin: '20px 0' }} dangerouslySetInnerHTML={{ __html: posts?.title?.rendered }} />
            <div style={{ margin: '20px 0', paddingBottom: '50px' }} dangerouslySetInnerHTML={{ __html: posts?.content?.rendered }} />
        </div>)
}

export async function getStaticPaths() {
    return {
        paths: [
            // String variant:
            '/about/slug',
            // Object variant:
            { params: { slug: '9501' } },
        ],
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://emoha.com/blogs/wp-json/wp/v2/posts/${params.slug}`)
    const posts = await res.json()
    return { props: { posts } }
}
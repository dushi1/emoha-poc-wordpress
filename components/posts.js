import React, { useEffect, useState } from 'react'
import Link from 'next/link'
const Posts = ({ media, posts }) => {
    const [pic, setPic] = useState(null)
    const [categories, setCategories] = useState(null)
    const [tags, setTags] = useState(null)

    useEffect(() => {
        const effect = async () => {
            fetch(`/api/media/${media}`)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    setPic(data)
                });
            fetch(`/api/categories/${posts?.categories[0]}`)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    setCategories(data)
                });
            fetch(`/api/tags/${posts?.tags[0]}`)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    setTags(data)
                });
        }
        effect()
    }, [])

    return (
        <Link href={`/about/${posts.id}`} style={{ width: "100%", maxWidth: '1200px', margin: '50px' }}>
            <img src={pic?.link} width={500} height={500} />
            <h4 style={{ margin: '20px 0' }} dangerouslySetInnerHTML={{ __html: posts?.title?.rendered }} />
            <h4>Categories : {categories?.name}</h4>
            <h4>Tags : {tags?.name}</h4>

        </Link>
    )
}


export default Posts
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
            if (posts?.categories) {
                fetch(`/api/categories/${posts?.categories[0]}`)
                    .then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        setCategories(data)
                    });
            }
            if (posts?.tags) {
                fetch(`/api/tags/${posts?.tags[0]}`)
                    .then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        setTags(data)
                    });
            }
        }
        effect()
    }, [])
    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '30em', padding: 20 }}>
            <a href={`/about/${posts.id}`}>
                <img src={pic?.link} style={{ width: '100%' }} />
                <div>Categories : {categories?.name}</div>
                <div>Tags : {tags?.name}</div>
                <h4 style={{ margin: '20px 0' }} dangerouslySetInnerHTML={{ __html: posts?.title?.rendered }} />
            </a>
        </div>
    )
}


export default Posts
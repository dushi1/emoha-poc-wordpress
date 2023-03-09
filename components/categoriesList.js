import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import '../styles/Home.module.css'
const Posts = ({ posts }) => {

    const imageUrl = (media, neww) => {
        fetch(`/api/media/${media}`)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                const img = document.getElementById(neww)
                img.src = data.link
            }).catch((er) => {
                console.log(er);
            })
    }
    return (
        <div style={{ display: 'flex', width: '100%', flexDirection: 'row', padding: 20 }}>
            <a href={`/about/${posts.slug}`} style={{ width: '50%', display: 'flex', flex: 1, flexDirection: 'column' }}>
                <img src={imageUrl(posts[0]?.featured_media, 'new')} id='new' style={{ width: '100%' }} />
                <div className='truncate' dangerouslySetInnerHTML={{ __html: posts[0]?.title?.rendered }} />
            </a>
            <div style={{ width: '50%', padding: 10 }}>
                <a href={`/about/${posts.slug}`} style={{ display: 'flex' }}>
                    <img src={imageUrl(posts[1]?.featured_media, 'new1')} id='new1' style={{ width: '30%' }} />
                    <div className='truncate' dangerouslySetInnerHTML={{ __html: posts[1]?.title?.rendered }} />
                </a>
                <a href={`/about/${posts.slug}`} style={{ display: 'flex' }}>
                    <img src={imageUrl(posts[2]?.featured_media, 'new2')} id='new2' style={{ width: '30%' }} />
                    <div className='truncate' dangerouslySetInnerHTML={{ __html: posts[2]?.title?.rendered }} />
                </a>
                <a href={`/about/${posts.slug}`} style={{ display: 'flex' }}>
                    <img src={imageUrl(posts[3]?.featured_media, 'new3')} id='new3' style={{ width: '30%' }} />
                    <div className='truncate' dangerouslySetInnerHTML={{ __html: posts[3]?.title?.rendered }} />
                </a>
            </div>
        </div>
    )
}


export default Posts
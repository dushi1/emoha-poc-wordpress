import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import '../styles/Home.module.css'
const Posts = ({ posts, img }) => {

    return (
        <div style={{ display: 'flex', width: '100%', flexDirection: 'row', padding: 20 }}>
            <a href={`/about/${posts[0]?.slug}`} style={{ width: '50%', display: 'flex', flex: 1, flexDirection: 'column' }}>
                <img src={img.find((obj) => posts[0].id === obj.post)?.link} style={{ width: '100%' }} />
                <strong dangerouslySetInnerHTML={{ __html: posts[0]?.title?.rendered }} />
            </a>
            <div style={{ width: '50%', padding: 10 }}>
                <a href={`/about/${posts[1]?.slug}`} style={{ display: 'flex', paddingBottom: 20 }}>
                    <img src={img.find((obj) => posts[1].id === obj.post)?.link} style={{ width: '30%' }} />
                    <strong className='truncate' dangerouslySetInnerHTML={{ __html: posts[1]?.title?.rendered }} />
                </a>
                <a href={`/about/${posts[2]?.slug}`} style={{ display: 'flex', paddingBottom: 20 }}>
                    <img src={img.find((obj) => posts[2].id === obj.post)?.link} style={{ width: '30%' }} />
                    <strong className='truncate' dangerouslySetInnerHTML={{ __html: posts[2]?.title?.rendered }} />
                </a>
                <a href={`/about/${posts[3]?.slug}`} style={{ display: 'flex' }}>
                    <img src={img.find((obj) => posts[3]?.id === obj.post)?.link} style={{ width: '30%' }} />
                    <strong className='truncate' dangerouslySetInnerHTML={{ __html: posts[3]?.title?.rendered }} />
                </a>
            </div>
        </div>
    )
}


export default Posts
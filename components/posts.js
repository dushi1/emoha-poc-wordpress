import React from 'react'

const Posts = ({ media, posts, id }) => {
    const image = media.filter((data) => data.post === id)
    const actualdata = posts.filter((data) => data.id === id)
    console.log(actualdata[0].title?.rendered);
    return (
        <div style={{ width: "100%", maxWidth: '1200px', margin: '50px' }}>
            <img src={image[0]?.source_url} width="100%" height={200} />
            <h1 style={{ margin: '20px 0' }} dangerouslySetInnerHTML={{ __html: actualdata[0].title?.rendered }} />
            <div style={{ margin: '20px 0', paddingBottom: '50px' }} dangerouslySetInnerHTML={{ __html: actualdata[0].content?.rendered }} />
        </div>
    )
}


export default Posts
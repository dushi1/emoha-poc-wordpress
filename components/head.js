import React from 'react'

const Head = () => {
    return (
        <div style={{ width: '100%', position: 'fixed', top: 0, height: 100, boxShadow: '10px 5px 5px black', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
                <img src="https://emoha.com/blogs/wp-content/uploads/2022/02/logo-red.svg" width={160} height={80} />
                <input style={{ height: 50, padding: 20, fontSize: 20 }} placeholder="Search...." />
            </div>
        </div>
    )
}

export default Head
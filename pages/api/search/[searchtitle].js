const { NextApiRequest, NextApiResponse } = require('next')

export default async function handler(
    req,
    res
) {
    const query = req.query;
    const { searchtitle } = query;
    const ress = await fetch(`https://emoha.com/blogs/wp-json/wp/v2/posts?search='${searchtitle}'`);
    const real = await ress.json()
    res.json(real)
}
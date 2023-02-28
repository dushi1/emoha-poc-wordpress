const { NextApiRequest, NextApiResponse } = require('next')

export default async function handler(
    req,
    res
) {
    const query = req.query;
    const { categoriesid } = query;
    const ress = await fetch(`https://emoha.com/blogs/wp-json/wp/v2/categories/${categoriesid}`);
    const real = await ress.json()
    res.json(real)
}
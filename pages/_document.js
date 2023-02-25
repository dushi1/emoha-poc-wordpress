import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="stylesheet" href="https://emoha.com/blogs/wp-content/themes/magbook-child/style.css" />
                <link rel="stylesheet" href="https://emoha.com/blogs/wp-content/themes/magbook-child/ctc-style.css" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
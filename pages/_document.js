import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="stylesheet" href="https://testing.emoha.com/blogs/wp-content/themes/magbook/css/editor-style.css" />
                {/* <link rel="stylesheet" href="https://testing.emoha.com/blogs/wp-content/themes/magbook/assets/font-awesome/css/font-awesome.css" />
                <link rel="stylesheet" href="https://testing.emoha.com/blogs/wp-content/themes/magbook/inc/css/magbook-customizer.css" /> */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
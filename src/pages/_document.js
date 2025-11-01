import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                        <Head>
                            {/* Google tag (gtag.js) */}
                            <script async src="https://www.googletagmanager.com/gtag/js?id=G-QQQ9L6CW7D"></script>
                            <script dangerouslySetInnerHTML={{__html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-QQQ9L6CW7D');
                            `}} />
                    {/* Preload the local font for better performance */}
                    <link
                        rel="preload"
                        href="/fonts/ShareTechMono-Regular.ttf"
                        as="font"
                        type="font/ttf"
                        crossOrigin="anonymous"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

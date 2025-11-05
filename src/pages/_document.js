import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                                <Head>
                                    {/* MailerLite Universal */}
                                    <script dangerouslySetInnerHTML={{__html: `
                                        (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
                                        .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
                                        n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
                                        (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
                                        ml('account', '1823203');
                                    `}} />
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

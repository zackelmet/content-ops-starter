import * as React from 'react';
import Head from 'next/head';
import classNames from 'classnames';

export default function BlankBaseLayout(props) {
    const { page, site } = props;
    const { enableAnnotations = true } = site;
    const pageMeta = page?.__metadata || {};
    return (
        <div className={classNames('sb-page', pageMeta.pageCssClasses)} {...(enableAnnotations && { 'data-sb-object-id': pageMeta.id })}>
            <Head>
                <title>{page.title}</title>
                <meta name="description" content="Components Library" />
                {/* Favicon / icons: prefer the configured site.favicon (SVG) but also provide PNG/apple manifest fallbacks
                    so the same logo is used across desktop, mobile and pinned/tab icons. */}
                {site.favicon && (
                    <>
                        {/* Primary SVG favicon (explicit type for browsers that honor SVG favicons) */}
                        <link rel="icon" type="image/svg+xml" href={site.favicon} />
                        {/* Old-school fallback for some user agents */}
                        <link rel="shortcut icon" href={site.favicon} />
                    </>
                )}
                {/* PNG/ICO fallbacks provided from the favicon_io export */}
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon_io/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon_io/favicon-16x16.png" />
                <link rel="shortcut icon" href="/images/favicon_io/favicon.ico" />
                {/* Apple touch icon */}
                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon_io/apple-touch-icon.png" />
                {/* Web manifest for PWAs / Android (from favicon_io) */}
                <link rel="manifest" href="/images/favicon_io/site.webmanifest" />
                <meta name="theme-color" content="#0a0a23" />
            </Head>
            {props.children}
        </div>
    );
}

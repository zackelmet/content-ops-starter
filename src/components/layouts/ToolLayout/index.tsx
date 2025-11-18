import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';

import { getBaseLayoutComponent } from '../../../utils/base-layout';
import { getComponent } from '../../components-registry';
import Link from '../../atoms/Link';

export default function ToolLayout(props) {
    const { page, site } = props;
    const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
    const { enableAnnotations = true } = site;
    const { title, excerpt, source, tags = [], featuredImage, markdown_content, category } = page;

    return (
        <BaseLayout page={page} site={site}>
            <main id="main" className="sb-layout sb-tool-layout">
                <article className="px-4 py-16 sm:py-28">
                    <div className="mx-auto max-w-screen-2xl">
                        {/* Tool Header */}
                        <header className="max-w-4xl mx-auto mb-12">
                            {/* Back Button */}
                            <div className="mb-6">
                                <Link
                                    href="/redteam-tools"
                                    className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors group"
                                >
                                    <svg 
                                        className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="font-semibold">Back to Red Team Tools</span>
                                </Link>
                            </div>

                            {/* Tool Name */}
                            <h1 className="text-5xl font-bold mb-6" {...(enableAnnotations && { 'data-sb-field-path': 'title' })}>
                                {title}
                            </h1>

                            {/* Description */}
                            {excerpt && (
                                <p className="text-xl text-neutral-300 mb-6" {...(enableAnnotations && { 'data-sb-field-path': 'excerpt' })}>
                                    {excerpt}
                                </p>
                            )}

                            {/* GitHub Link */}
                            {source && (
                                <div className="mb-6">
                                    <a
                                        href={source}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:bg-primary-light transition-colors"
                                        {...(enableAnnotations && { 'data-sb-field-path': 'source' })}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                        View on GitHub
                                    </a>
                                </div>
                            )}

                            {/* Tags */}
                            {tags && tags.length > 0 && (
                                <div className="flex flex-wrap gap-2" {...(enableAnnotations && { 'data-sb-field-path': 'tags' })}>
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-block px-3 py-1 text-sm rounded bg-neutral-800 text-neutral-400 border border-neutral-700"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </header>

                        {/* Featured Image */}
                        {featuredImage?.url && (
                            <div className="max-w-4xl mx-auto mb-12">
                                <img
                                    src={featuredImage.url}
                                    alt={featuredImage.altText || title}
                                    className="w-full rounded-xl shadow-2xl"
                                    {...(enableAnnotations && { 'data-sb-field-path': 'featuredImage' })}
                                />
                            </div>
                        )}

                        {/* Tool Content */}
                        {markdown_content && (
                            <Markdown
                                options={{ forceBlock: true }}
                                className="max-w-3xl mx-auto sb-markdown"
                                {...(enableAnnotations && { 'data-sb-field-path': 'markdown_content' })}
                            >
                                {markdown_content}
                            </Markdown>
                        )}
                    </div>
                </article>
            </main>
        </BaseLayout>
    );
}

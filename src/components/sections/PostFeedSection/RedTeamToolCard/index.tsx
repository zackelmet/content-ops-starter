import * as React from 'react';
import classNames from 'classnames';
import { mapStylesToClassNames as mapStyles } from '../../../../utils/map-styles-to-class-names';
import { getPageUrl } from '../../../../utils/page-utils';
import Link from '../../../atoms/Link';
import ImageBlock from '../../../blocks/ImageBlock';

export default function RedTeamToolCard(props) {
    const {
        post,
        hoverEffect = 'shadow-plus-move-up',
        sectionColors,
        hasAnnotations
    } = props;

    const hasFeaturedImage = !!(post.featuredImage?.url);
    const githubUrl = post.source || post.github_url;

    return (
        <Link
            href={getPageUrl(post)}
            className={classNames(
                'sb-card',
                'block',
                'group',
                post.colors ?? 'bg-dark-fg-light',
                'p-0',
                'rounded-xl',
                'overflow-hidden',
                'border border-transparent',
                'transition-all duration-300 ease-in-out',
                'hover:border-primary',
                'hover:shadow-2xl',
                'hover:-translate-y-1.5',
                mapCardHoverStyles(hoverEffect, sectionColors)
            )}
            {...(hasAnnotations && { 'data-sb-object-id': post.__metadata?.id })}
        >
            {/* Featured Image */}
            {hasFeaturedImage && (
                <div className="w-full h-48 overflow-hidden bg-neutral-700">
                    <ImageBlock
                        {...post.featuredImage}
                        className="w-full h-full"
                        imageClassName="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        {...(hasAnnotations && { 'data-sb-field-path': 'featuredImage' })}
                    />
                </div>
            )}

            {/* Card Content */}
            <div className="p-6">
                {/* Tool Name */}
                <h3 
                    className="text-2xl font-bold mb-2 text-primary group-hover:text-primary-light transition-colors"
                    {...(hasAnnotations && { 'data-sb-field-path': 'title' })}
                >
                    {post.title}
                </h3>

                {/* Category Badge */}
                {post.category && (
                    <div className="mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
                            {post.category}
                        </span>
                    </div>
                )}

                {/* Description/Excerpt */}
                {post.excerpt && (
                    <p 
                        className="text-sm text-neutral-300 mb-4 line-clamp-3"
                        {...(hasAnnotations && { 'data-sb-field-path': 'excerpt' })}
                    >
                        {post.excerpt}
                    </p>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 4).map((tag, index) => (
                            <span 
                                key={index}
                                className="inline-block px-2 py-1 text-xs rounded bg-neutral-800 text-neutral-400 border border-neutral-700"
                            >
                                #{tag}
                            </span>
                        ))}
                        {post.tags.length > 4 && (
                            <span className="inline-block px-2 py-1 text-xs rounded bg-neutral-800 text-neutral-400">
                                +{post.tags.length - 4} more
                            </span>
                        )}
                    </div>
                )}

                {/* GitHub Link */}
                {githubUrl && (
                    <div className="flex items-center gap-2 text-sm text-neutral-400 group-hover:text-primary transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span className="font-mono text-xs truncate">
                            {githubUrl.replace('https://github.com/', '')}
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
}

function mapCardHoverStyles(hoverEffect: string, colors: string) {
    switch (hoverEffect) {
        case 'move-up':
            return 'transition duration-200 ease-in hover:-translate-y-1.5';
        case 'shadow':
            return colors === 'bg-dark-fg-light'
                ? 'transition duration-200 ease-in hover:shadow-2xl hover:shadow-black/60'
                : 'transition duration-200 ease-in hover:shadow-2xl';
        case 'shadow-plus-move-up':
            return colors === 'bg-dark-fg-light'
                ? 'transition duration-200 ease-in hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1.5'
                : 'transition duration-200 ease-in hover:shadow-2xl hover:-translate-y-1.5';
        default:
            return null;
    }
}

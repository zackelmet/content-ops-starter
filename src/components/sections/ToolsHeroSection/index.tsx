import * as React from 'react';
import { useState, useMemo } from 'react';
import classNames from 'classnames';
import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import Section from '../Section';
import { Badge } from '../../atoms';
import TitleBlock from '../../blocks/TitleBlock';
import RedTeamToolCard from '../PostFeedSection/RedTeamToolCard';

export default function ToolsHeroSection(props) {
    const {
        elementId,
        colors,
        backgroundImage,
        badge,
        title,
        subtitle,
        posts = [],
        hoverEffect = 'shadow-plus-move-up',
        styles = {},
        enableAnnotations
    } = props;

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    // Get all unique tags from tools
    const allTags = useMemo(() => {
        const tagSet = new Set();
        posts.forEach(post => {
            if (post.tags && Array.isArray(post.tags)) {
                post.tags.forEach(tag => tagSet.add(tag));
            }
        });
        return Array.from(tagSet).sort();
    }, [posts]);

    // Filter posts based on search query and selected tags
    const filteredPosts = useMemo(() => {
        let filtered = posts;

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(post => {
                if (post.title?.toLowerCase().includes(query)) return true;
                if (post.excerpt?.toLowerCase().includes(query)) return true;
                if (post.category?.toLowerCase().includes(query)) return true;
                if (post.tags?.some(tag => String(tag).toLowerCase().includes(query))) return true;
                return false;
            });
        }

        if (selectedTags.length > 0) {
            filtered = filtered.filter(post => {
                return selectedTags.every(selectedTag => 
                    post.tags?.includes(selectedTag)
                );
            });
        }

        return filtered;
    }, [posts, searchQuery, selectedTags]);

    const handleTagToggle = (tag) => {
        setSelectedTags(prev => 
            prev.includes(tag) 
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedTags([]);
    };

    const hasActiveFilters = searchQuery.trim() || selectedTags.length > 0;

    return (
        <Section
            elementId={elementId}
            className="sb-component-tools-hero-section"
            colors={colors}
            backgroundImage={backgroundImage}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className={classNames('w-full', 'flex', 'flex-col', mapStyles({ alignItems: styles?.self?.justifyContent ?? 'flex-start' }))}>
                {/* Header */}
                {badge && <Badge {...badge} className="w-full max-w-sectionBody" {...(enableAnnotations && { 'data-sb-field-path': '.badge' })} />}
                {title && (
                    <TitleBlock
                        {...title}
                        className={classNames('w-full', 'max-w-sectionBody', { 'mt-4': badge?.label })}
                        {...(enableAnnotations && { 'data-sb-field-path': '.title' })}
                    />
                )}
                {subtitle && (
                    <p
                        className={classNames(
                            'w-full',
                            'max-w-sectionBody',
                            'text-lg',
                            'sm:text-2xl',
                            styles?.subtitle ? mapStyles(styles?.subtitle) : undefined,
                            {
                                'mt-4': badge?.label || title?.text
                            }
                        )}
                        {...(enableAnnotations && { 'data-sb-field-path': '.subtitle' })}
                    >
                        {subtitle}
                    </p>
                )}

                {/* Search Section */}
                <div className={classNames('w-full', { 'mt-12': badge?.label || title?.text || subtitle })}>
                    {/* Search Input */}
                    <div className="relative mb-6">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search tools by name, description, or tags..."
                            className="w-full px-6 py-4 bg-neutral-900 border border-neutral-700 rounded-lg text-light placeholder-neutral-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <svg 
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Tag Filters */}
                    {allTags.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-neutral-400 uppercase">Filter by Tags</h3>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-xs text-primary hover:text-primary-light transition-colors"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {allTags.map((tag, index) => {
                                    const isSelected = selectedTags.includes(tag);
                                    const tagString = String(tag);
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleTagToggle(tag)}
                                            className={classNames(
                                                'px-3 py-1.5 text-sm rounded-lg border transition-all',
                                                isSelected
                                                    ? 'bg-primary text-dark border-primary font-semibold'
                                                    : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:border-primary hover:text-primary'
                                            )}
                                        >
                                            #{tagString}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Results Count */}
                    <div className="flex items-center justify-between py-3 border-t border-neutral-800 mb-8">
                        <p className="text-sm text-neutral-400">
                            {filteredPosts.length === posts.length ? (
                                <>Showing all <span className="font-semibold text-light">{posts.length}</span> tools</>
                            ) : (
                                <>Found <span className="font-semibold text-primary">{filteredPosts.length}</span> of {posts.length} tools</>
                            )}
                        </p>
                        {hasActiveFilters && (
                            <div className="flex items-center gap-2 text-xs text-neutral-500">
                                {searchQuery.trim() && (
                                    <span className="px-2 py-1 bg-neutral-900 rounded">"{searchQuery}"</span>
                                )}
                                {selectedTags.length > 0 && (
                                    <span className="px-2 py-1 bg-neutral-900 rounded">{selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''}</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Tools Grid */}
                <div className="w-full grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post, index) => (
                        <RedTeamToolCard
                            key={index}
                            post={post}
                            hoverEffect={hoverEffect}
                            sectionColors={colors}
                            hasAnnotations={enableAnnotations}
                        />
                    ))}
                </div>

                {/* No Results */}
                {filteredPosts.length === 0 && (
                    <div className="w-full text-center py-16">
                        <p className="text-xl text-neutral-400 mb-4">No tools found</p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-2 bg-primary text-dark rounded-lg hover:bg-primary-light transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </Section>
    );
}

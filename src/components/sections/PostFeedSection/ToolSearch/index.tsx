import * as React from 'react';
import { useState, useMemo } from 'react';
import classNames from 'classnames';

export default function ToolSearch(props) {
    const { posts = [], onFilteredPostsChange, className } = props;
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

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(post => {
                // Search in title
                if (post.title?.toLowerCase().includes(query)) return true;
                // Search in excerpt/description
                if (post.excerpt?.toLowerCase().includes(query)) return true;
                // Search in category
                if (post.category?.toLowerCase().includes(query)) return true;
                // Search in tags
                if (post.tags?.some(tag => tag.toLowerCase().includes(query))) return true;
                return false;
            });
        }

        // Filter by selected tags
        if (selectedTags.length > 0) {
            filtered = filtered.filter(post => {
                return selectedTags.every(selectedTag => 
                    post.tags?.includes(selectedTag)
                );
            });
        }

        return filtered;
    }, [posts, searchQuery, selectedTags]);

    // Update parent component when filtered posts change
    React.useEffect(() => {
        if (onFilteredPostsChange) {
            onFilteredPostsChange(filteredPosts);
        }
    }, [filteredPosts, onFilteredPostsChange]);

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
        <div className={classNames('w-full', className)}>
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
            <div className="flex items-center justify-between py-3 border-t border-neutral-800">
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
    );
}

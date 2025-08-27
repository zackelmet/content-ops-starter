import {
    defineStackbitConfig,
    DocumentStringLikeFieldNonLocalized,
    SiteMapEntry
} from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import { Page, BlogPost, CTIItem } from 'sources/local/models/CustomModels';

const gitContentSource = new GitContentSource({
    rootPath: __dirname,
    contentDirs: ['content/pages', 'content/blog/posts'], // 👈 include blog posts dir
    models: [Page, BlogPost, CTIItem],
    assetsConfig: {
        referenceType: 'static',
        staticDir: 'public',
        uploadDir: 'images',
        publicPath: '/'
    }
});

export const config = defineStackbitConfig({
    stackbitVersion: '~0.7.0',
    ssgName: 'nextjs',
    nodeVersion: '18',
    styleObjectModelName: 'ThemeStyle',
    contentSources: [gitContentSource],
    presetSource: {
        type: 'files',
        presetDirs: ['sources/local/presets']
    },

    // ✅ Explicitly define page types
    modelExtensions: [
        // Top-level pages like about.md, index.md
        { name: 'Page', type: 'page', urlPath: '/{slug}' },

        // Blog posts under content/pages/blog/
        { name: 'BlogPost', type: 'page', urlPath: '/blog/{slug}' },

        // Custom CTI items under content/pages/intel/
        { name: 'CTIItem', type: 'page', urlPath: '/intel/{slug}' }
    ],

    siteMap: ({ documents, models }): SiteMapEntry[] => {
        const pageModels = models
            .filter((model) => model.type === 'page')
            .map((model) => model.name);

        return documents
            .filter((document) => pageModels.includes(document.modelName))
            .map((document) => {
                const slugField = document.fields.slug as DocumentStringLikeFieldNonLocalized | undefined;
                const rawSlug = slugField?.value;
                if (!rawSlug) return null;

                const slug = rawSlug.replace(/^\/+/, '');

                let urlPath = `/${slug}`;
                if (document.modelName === 'BlogPost') {
                    urlPath = `/blog/${slug}`;
                } else if (document.modelName === 'CTIItem') {
                    urlPath = `/intel/${slug}`;
                }

                return {
                    stableId: document.id,   // stable ID is required for Visual Editor
                    urlPath,
                    document
                };
            })
            .filter(Boolean) as SiteMapEntry[];
    }
});

export default config;

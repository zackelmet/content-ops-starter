import { defineStackbitConfig, DocumentStringLikeFieldNonLocalized, SiteMapEntry } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import { Page, BlogPost, CTIItem } from 'sources/local/models/CustomModels';

const gitContentSource = new GitContentSource({
    rootPath: __dirname,
    contentDirs: ['content'],
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

    // 👇 Explicitly mark which models are "pages"
    modelExtensions: [
        { name: 'Page', type: 'page', urlPath: '/{slug}' },
        { name: 'BlogPost', type: 'page', urlPath: '/blog/{slug}' },
        { name: 'CTIItem', type: 'page', urlPath: '/intel/{slug}' }
    ],

    siteMap: ({ documents, models }): SiteMapEntry[] => {
        const pageModels = models.filter((model) => model.type === 'page').map((model) => model.name);
        return documents
            .filter((document) => pageModels.includes(document.modelName))
            .map((document) => {
                let slug = (document.fields.slug as DocumentStringLikeFieldNonLocalized)?.value;
                if (!slug) return null;
                slug = slug.replace(/^\/+/, '');
                switch (document.modelName) {
                    case 'BlogPost':
                        return {
                            urlPath: `/blog/${slug}`,
                            document: document
                        };
                    case 'CTIItem':
                        return {
                            urlPath: `/intel/${slug}`,
                            document: document
                        };
                    case 'Page':
                        return {
                            urlPath: `/${slug}`,
                            document: document
                        };
                    default:
                        return null;
                }
            })
            .filter(Boolean) as SiteMapEntry[];
    }
});

export default config;

import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import { Page, BlogPost, CTIItem } from 'sources/local/models/CustomModels';

const gitContentSource = new GitContentSource({
    rootPath: __dirname,
    contentDirs: ['content/pages', 'content/blog/posts'],
    models: [Page, BlogPost, CTIItem],
    assetsConfig: {
        referenceType: 'static',
        staticDir: 'public',
        uploadDir: 'images',
        publicPath: '/'
    }
});

export default defineStackbitConfig({
    stackbitVersion: '~0.7.0',
    ssgName: 'nextjs',
    nodeVersion: '18',
    styleObjectModelName: 'ThemeStyle',
    contentSources: [gitContentSource],
    presetSource: {
        type: 'files',
        presetDirs: ['sources/local/presets']
    },
    modelExtensions: [
        { name: 'Page', type: 'page', urlPath: '/{slug}' },
        { name: 'BlogPost', type: 'page', urlPath: '/blog/{slug}' },
        { name: 'CTIItem', type: 'page', urlPath: '/intel/{slug}' }
    ]
    // No custom siteMap property: use default sitemap behavior
});

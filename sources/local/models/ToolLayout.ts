import { Model } from '@stackbit/types';

export const ToolLayout: Model = {
    type: 'page',
    name: 'ToolLayout',
    label: 'Red Team Tool',
    labelField: 'title',
    filePath: 'content/pages/blog/red-team-tools/{slug}.md',
    fieldGroups: [
        {
            name: 'toolInfo',
            label: 'Tool Information',
            icon: 'code'
        },
        {
            name: 'settings',
            label: 'Settings',
            icon: 'gear'
        }
    ],
    fields: [
        {
            type: 'string',
            name: 'title',
            label: 'Tool Name',
            required: true,
            hidden: false,
            localized: false
        },
        {
            type: 'string',
            name: 'category',
            label: 'Category',
            required: true,
            default: 'redteam-tools',
            hidden: false,
            localized: false,
            group: 'toolInfo'
        },
        {
            type: 'string',
            name: 'excerpt',
            label: 'Description',
            required: true,
            hidden: false,
            localized: false,
            group: 'toolInfo'
        },
        {
            type: 'string',
            name: 'source',
            label: 'GitHub URL',
            required: true,
            hidden: false,
            localized: false,
            group: 'toolInfo'
        },
        {
            type: 'list',
            name: 'tags',
            label: 'Tags',
            required: false,
            hidden: false,
            localized: false,
            items: {
                type: 'string'
            },
            group: 'toolInfo'
        },
        {
            type: 'model',
            name: 'featuredImage',
            label: 'Featured Image',
            required: false,
            hidden: false,
            localized: false,
            models: ['ImageBlock'],
            group: 'toolInfo'
        },
        {
            type: 'markdown',
            name: 'markdown_content',
            label: 'Content',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'slug',
            name: 'slug',
            label: 'Slug',
            required: true,
            hidden: false,
            localized: false,
            group: 'settings'
        },
        {
            type: 'boolean',
            name: 'isFeatured',
            label: 'Featured Tool',
            required: false,
            default: false,
            hidden: false,
            localized: false,
            group: 'settings'
        },
        {
            type: 'boolean',
            name: 'isDraft',
            label: 'Draft',
            required: false,
            default: false,
            hidden: false,
            localized: false,
            group: 'settings'
        },
        {
            type: 'enum',
            name: 'colors',
            label: 'Colors',
            required: false,
            default: 'bg-dark-fg-light',
            hidden: false,
            localized: false,
            options: [
                {
                    label: 'Dark background, light foreground',
                    value: 'bg-dark-fg-light',
                    textColor: '$light',
                    backgroundColor: '$dark',
                    borderColor: '#ececec'
                },
                {
                    label: 'Light background, dark foreground',
                    value: 'bg-light-fg-dark',
                    textColor: '$dark',
                    backgroundColor: '$light',
                    borderColor: '#ececec'
                }
            ],
            controlType: 'palette'
        },
        {
            type: 'style',
            name: 'styles',
            label: 'Styles',
            required: false,
            hidden: false,
            localized: false,
            styles: {
                self: {
                    margin: ['tw0:96'],
                    padding: ['tw0:96'],
                    borderWidth: ['0:2', '4:8:4'],
                    borderStyle: '*',
                    borderColor: [
                        {
                            value: 'border-primary',
                            label: 'Primary',
                            color: '$primary'
                        }
                    ],
                    borderRadius: '*'
                }
            }
        }
    ]
};

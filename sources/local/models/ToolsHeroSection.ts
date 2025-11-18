import { Model } from '@stackbit/types';

export const ToolsHeroSection: Model = {
    type: 'object',
    name: 'ToolsHeroSection',
    label: 'Tools Hero Section',
    labelField: 'title.text',
    fields: [
        {
            type: 'string',
            name: 'elementId',
            label: 'Element ID',
            description: 'The unique ID for this component, must not contain whitespace',
            group: 'settings'
        },
        {
            type: 'enum',
            name: 'colors',
            label: 'Colors',
            description: 'The color theme of the page',
            group: 'styles',
            controlType: 'palette',
            options: [
                { label: 'Colors A', value: 'bg-light-fg-dark' },
                { label: 'Colors B', value: 'bg-dark-fg-light' },
                { label: 'Colors C', value: 'bg-neutral-fg-dark' },
                { label: 'Colors D', value: 'bg-neutralAlt-fg-dark' }
            ],
            default: 'bg-light-fg-dark'
        },
        {
            type: 'model',
            name: 'backgroundImage',
            label: 'Background image',
            models: ['BackgroundImage'],
            group: 'styles'
        },
        {
            type: 'model',
            name: 'badge',
            label: 'Badge',
            models: ['Badge']
        },
        {
            type: 'model',
            name: 'title',
            label: 'Title',
            models: ['TitleBlock']
        },
        {
            type: 'string',
            name: 'subtitle',
            label: 'Subtitle',
            default: ''
        },
        {
            type: 'list',
            name: 'posts',
            label: 'Tools',
            items: {
                type: 'reference',
                models: ['ToolLayout']
            }
        },
        {
            type: 'enum',
            name: 'hoverEffect',
            label: 'Hover effect',
            options: [
                { label: 'Shadow plus move up', value: 'shadow-plus-move-up' },
                { label: 'Move up', value: 'move-up' },
                { label: 'Thick underline', value: 'thick-underline' },
                { label: 'Thin underline', value: 'thin-underline' }
            ],
            default: 'shadow-plus-move-up',
            group: 'cardStyles'
        },
        {
            type: 'style',
            name: 'styles',
            label: 'Styles',
            description: 'The styles field is controlled by Stackbit editor',
            styles: {
                self: {
                    margin: ['tw0:96'],
                    padding: ['tw0:96'],
                    justifyContent: ['flex-start', 'flex-end', 'center']
                }
            }
        }
    ],
    fieldGroups: [
        {
            name: 'styles',
            label: 'Styles',
            icon: 'palette'
        },
        {
            name: 'cardStyles',
            label: 'Card styles',
            icon: 'palette'
        },
        {
            name: 'settings',
            label: 'Settings',
            icon: 'gear'
        }
    ]
};

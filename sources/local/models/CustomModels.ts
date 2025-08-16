import { Model } from '@stackbit/types';

export const Page: Model = {
    name: "Page",
    type: "page",
    urlPath: "/{slug}",
    filePath: "content/pages/{slug}.json",
    fields: [
        { name: "title", type: "string", required: true },
        { name: "body", type: "markdown" }
    ]
};

export const BlogPost: Model = {
    name: "BlogPost",
    type: "page",
    urlPath: "/blog/{slug}",
    filePath: "content/blog/{slug}.md",
    fields: [
        { name: "title", type: "string", required: true },
        { name: "date", type: "date" },
        { name: "summary", type: "string" },
        { name: "body", type: "markdown" },
        { name: "tags", type: "list", items: { type: "string" } }
    ]
};

export const CTIItem: Model = {
    name: "CTIItem",
    type: "page",
    urlPath: "/intel/{slug}",
    filePath: "content/intel/{slug}.md",
    fields: [
        { name: "title", type: "string", required: true },
        { name: "date", type: "date" },
        { name: "summary", type: "string" },
        { name: "body", type: "markdown" },
        { name: "source", type: "string" },
        { name: "tags", type: "list", items: { type: "string" } }
    ]
};

export const monacoLanguageMap: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    java: "java",
    csharp: "csharp",
    go: "go",
    cpp: "cpp",
    php: "php",
    ruby: "ruby",
    swift: "swift",
    kotlin: "kotlin",
    rust: "rust",
    scala: "scala",
    dart: "dart",
    sql: "sql",
    html: "html",
    css: "css",

    // Frameworks/tools default to JS or plaintext
    react: "javascript",
    angular: "typescript",
    vue: "javascript",
    svelte: "javascript",
    graphql: "graphql", // make sure you add the GraphQL language plugin
    docker: "dockerfile",

    // fallback for unsupported
    rest: "plaintext",
    aws: "plaintext",
    firebase: "plaintext",
    // etc.
};

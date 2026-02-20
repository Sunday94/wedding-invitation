declare module '*?raw' {
    const content: string;
    export default content;
}

declare module '*.jsonc' {
    const content: any;
    export default content;
}

declare module 'dom-to-image' {
    interface Options {
        filter?: (node: HTMLElement) => boolean;
        bgcolor?: string;
        width?: number;
        height?: number;
        style?: object;
        quality?: number;
        imagePlaceholder?: string;
        cacheBust?: boolean;
    }

    function toPng(node: HTMLElement, options?: Options): Promise<string>;
    function toJpeg(node: HTMLElement, options?: Options): Promise<string>;
    function toBlob(node: HTMLElement, options?: Options): Promise<Blob>;
    function toSvg(node: HTMLElement, options?: Options): Promise<string>;
    function toPixelData(node: HTMLElement, options?: Options): Promise<Uint8Array>;

    export {
        toPng,
        toJpeg,
        toBlob,
        toSvg,
        toPixelData,
    };
}

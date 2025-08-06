import type { Credentials, Result, Prompt, GeneratedImage } from "./global.types";
declare class ImageFx {
    #private;
    credentials: Credentials;
    constructor(credentials: Credentials);
    getAuthToken(mutate?: boolean): Promise<Result<string>>;
    /**
    * Generate image from provided prompt
    */
    generateImage(prompt: Prompt): Promise<Result<GeneratedImage[]>>;
}
export default ImageFx;

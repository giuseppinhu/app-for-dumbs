export type ImageModel = "IMAGEN_2" | "IMAGEN_3" | "IMAGEN_4" | "IMAGEN_3_1" | "IMAGEN_3_5" | "IMAGEN_3_PORTRAIT" | "IMAGEN_3_LANDSCAPE" | "IMAGEN_3_PORTRAIT_THREE_FOUR" | "IMAGEN_3_LANDSCAPE_FOUR_THREE";
export type AspectRatio = "IMAGE_ASPECT_RATIO_SQUARE" | "IMAGE_ASPECT_RATIO_PORTRAIT" | "IMAGE_ASPECT_RATIO_LANDSCAPE" | "IMAGE_ASPECT_RATIO_UNSPECIFIED" | "IMAGE_ASPECT_RATIO_LANDSCAPE_FOUR_THREE" | "IMAGE_ASPECT_RATIO_PORTRAIT_THREE_FOUR";
export interface Credentials {
    cookie?: string;
    authorizationKey?: string;
}
export interface Result<T> {
    Ok?: T;
    Err?: Error;
}
export interface Request {
    url: string;
    headers: Headers;
    body?: string;
    method: "GET" | "POST" | "HEAD" | "OPTIONS" | "PUT" | "PATCH" | "DELETE";
}
export interface Prompt {
    prompt: string;
    count?: number;
    seed?: number;
    model?: ImageModel;
    aspectRatio?: AspectRatio;
}
export interface GeneratedImage {
    encodedImage: string;
    seed: number;
    mediaGenerationId: string;
    isMaskEditedImage: boolean;
    prompt: string;
    modelNameType: ImageModel;
    workflowId: string;
    fingerprintLogRecordId: string;
}

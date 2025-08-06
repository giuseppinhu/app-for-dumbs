/**
* Saves content to a file
* @param fileName Name of file to save contents to.
* @param fileContent Content to save to `fileName`
* @param encoding Encoding to use (base64, yada yada)
* @param filePath Path to save to.
*/
declare const saveFile: (fileName: string, fileContent: string, encoding?: BufferEncoding, filePath?: string) => void;
declare const saveImage: (fileName: string, imageContent: string, filePath?: string) => void;
export { saveFile, saveImage };

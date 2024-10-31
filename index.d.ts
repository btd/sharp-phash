import sharp, { SharpOptions } from 'sharp';

/**
 * Calculate the perceptual hash of an image
 * @param input Buffer containing image data or a string containing the path to an image. 
 * @param options Object with optional attributes.
 * @returns A promise that resolves to a 64-char 01 string as the perceptual hash of the image
 */
declare function phash(
    image?: Parameters<typeof sharp>[0],
    options?: SharpOptions
): Promise<string>;

export default phash;
declare module 'sharp-phash' {
  /**
   * Calculates the perceptual hash of an image buffer.
   * @param imageBuffer The image buffer to hash.
   * @returns A promise that resolves to the perceptual hash as a string.
   */
  export function phash(imageBuffer: Buffer): Promise<string>;

  /**
   * Calculates the Hamming distance between two perceptual hashes.
   * @param hash1 The first perceptual hash.
   * @param hash2 The second perceptual hash.
   * @returns The Hamming distance between the two hashes.
   */
  export function distance(hash1: string, hash2: string): number;
}

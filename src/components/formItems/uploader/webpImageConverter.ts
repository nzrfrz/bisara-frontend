import type { RcFile } from "antd/es/upload";

export const webpImageConverter = async (file: RcFile) => {
  if (file.type === 'image/gif' || file.type === 'image/webp' || file.type === 'image/svg+xml' || file.type === 'image/tiff') return file;

  try {
    const maxWidth = 1920;
    const maxHeight = 1080;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    const webpBlob: BlobPart = await new Promise((resolve, reject) => {
      img.onload = () => {
        let width = img.naturalWidth;
        let height = img.naturalHeight;

        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;

          if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
          }

          if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
          }

          // Ensure no rounding errors push dimensions over limits
          if (width > maxWidth) width = maxWidth;
          if (height > maxHeight) height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.round(width); // Round to avoid subpixel issues
        canvas.height = Math.round(height); // Round to avoid subpixel issues
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('WebP conversion failed'));
            }
          },
          'image/webp',
          1 // Quality (0 to 1)
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    });

    const webpFile = new File([webpBlob], `${file.name.split('.')[0]}.webp`, {
      type: 'image/webp',
      lastModified: Date.now(),
    });

    URL.revokeObjectURL(img.src);

    return webpFile;
  } catch (error) {
    console.error('Error converting image to WebP:', error);
    return false;
  }
};
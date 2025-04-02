import sharp from 'sharp';

export async function generateBlurPlaceholder(imageUrl: string): Promise<string> {
  if (!imageUrl) {
    return '';
  }

  try {
    const imageBuffer = await fetch(imageUrl).then(res => res.arrayBuffer());
    
    const { data, info } = await sharp(Buffer.from(imageBuffer))
      .resize(8, 8, { fit: 'inside' })
      .toFormat('jpeg')
      .toBuffer({ resolveWithObject: true });

    const base64 = `data:image/jpeg;base64,${data.toString('base64')}`;
    return base64;
  } catch (error) {
    console.error('Error generating blur placeholder:', error);
    return '';
  }
}

export async function processImage(imageUrl: string) {
  const blurDataURL = await generateBlurPlaceholder(imageUrl);
  
  // Get the image dimensions
  const imageBuffer = await fetch(imageUrl).then(res => res.arrayBuffer());
  const metadata = await sharp(Buffer.from(imageBuffer)).metadata();
  
  return {
    src: imageUrl,
    width: metadata.width || 1920, // fallback width
    height: metadata.height || 1080, // fallback height
    blurDataURL
  };
} 
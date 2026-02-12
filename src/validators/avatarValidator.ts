import sharp from "sharp";
import { validateSvgAvatar } from "./svgValidator.js";

export interface ImageValidationResult {
  width: number;
  height: number;
  format: string;
  size: number;
  safeBuffer: Buffer;
}

export async function validateAvatarImage(
  buffer: Buffer
): Promise<ImageValidationResult> {
  const metadata = await sharp(buffer).metadata();
  const format = metadata.format;

  if (!format) {
    throw new Error("Unsupported or unknown image format");
  }

  const width = metadata.width;
  const height = metadata.height;

  if (!width || !height) {
    throw new Error("Could not determine image dimensions");
  }

  if (width < 64 || height < 64) {
    throw new Error("Image too small (min 64x64)");
  }

  if (width > 2048 || height > 2048) {
    throw new Error("Image too large (max 2048x2048)");
  }

  const targetFormat = "png"; // common safe web format

  let safeBuffer: Buffer;

  if (format === "svg") {
    const svgText = buffer.toString("utf8");
    const svgValidation = await validateSvgAvatar(
      Buffer.from(svgText, "utf-8")
    );
    safeBuffer = await sharp(svgValidation.safeBuffer)
      .resize({
        width: Math.min(width, 2048),
        height: Math.min(height, 2048),
        fit: "inside",
      })
      .toFormat(targetFormat)
      .toBuffer();
  } else {
    safeBuffer = await sharp(buffer)
      .resize({
        width: Math.min(width, 2048),
        height: Math.min(height, 2048),
        fit: "inside",
      })
      .toFormat(targetFormat, { quality: 90 })
      .toBuffer();
  }

  return {
    width,
    height,
    format,
    size: buffer.length,
    safeBuffer,
  };
}

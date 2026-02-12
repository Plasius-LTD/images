export function parseWebp(buffer: Buffer): {
  width: number;
  height: number;
} {
  const chunkHeader = buffer.slice(12, 16).toString();

  if (chunkHeader === "VP8X") {
    const width = 1 + buffer.readUIntLE(24, 3);
    const height = 1 + buffer.readUIntLE(27, 3);
    return { width, height };
  } else if (chunkHeader === "VP8 ") {
    // Simple lossless: parse frame header
    const width = buffer.readUInt16LE(26) & 0x3fff;
    const height = buffer.readUInt16LE(28) & 0x3fff;
    return { width, height };
  } else {
    throw new Error("Unsupported WEBP chunk type: " + chunkHeader);
  }
}

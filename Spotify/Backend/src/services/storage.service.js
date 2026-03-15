import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";

const imagekit = new ImageKit({
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
});

export async function uploadFile(buffer, fileName) {
  const fileResult = await imagekit.files.upload({
    file: await ImageKit.toFile(buffer, fileName),
    fileName: fileName,
    folder: "/songs",
  });
  return fileResult;
}

export async function deleteFile(fileId) {
  const result = await imagekit.files.delete(fileId);
  return result;
}

export default imagekit;

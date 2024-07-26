// cloudinary.ts
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.API_KEY as string,
  api_secret: process.env.API_SECRET as string,
  timeout: 60000 * 2, // Set timeout to 60 seconds (or adjust as needed)
});

export const uploadImage = async (
  file: File,
  folder: string,
  retryCount: number = 3
): Promise<UploadApiResponse | UploadApiErrorResponse> => {
  try {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    let uploadAttempt = 0;
    while (uploadAttempt < retryCount) {
      try {
        return await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "auto",
                folder: folder,
              },
              (err, result) => {
                if (err) {
                  reject(err as UploadApiErrorResponse);
                } else {
                  resolve(result as UploadApiResponse);
                }
              }
            )
            .end(bytes);
        });
      } catch (error) {
        console.error(
          `Error uploading file (attempt ${uploadAttempt + 1}):`,
          error
        );
        uploadAttempt++;
        // Implement exponential backoff or wait before retrying
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * uploadAttempt)
        );
      }
    }

    throw new Error(`Failed to upload file after ${retryCount} attempts`);
  } catch (error) {
    return Promise.reject(error as UploadApiErrorResponse);
  }
};

export default uploadImage;

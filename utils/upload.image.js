import cloudinary from "cloudinary";

export const uploadImageToCloudinary = async (imagePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder : folderName
    })
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

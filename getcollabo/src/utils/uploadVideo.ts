import axios from "axios";

const uploadVideo = async (videoFile) => {
  const data = new FormData();
  data.append("file", videoFile);
  data.append("upload_preset", "getcollabo");

  try {
    const response = await axios.post("https://api.cloudinary.com/v1_1/newlink/video/upload", data);
    const {url} = response.data;
    const videoUrl = url;
    
    return videoUrl;
  } catch (err) {
    console.log(err);
  }
};

export default uploadVideo;
import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "getcollabo");

  try {
    const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/newlink/image/upload", data);
    const {url} = uploadRes.data;
    
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { app } from "./init";

const storage = getStorage(app);

function uploadImage(dataURL, link) {
  const storageRef = ref(storage, link);

  return uploadString(storageRef, dataURL, "data_url");
}

function downloadImage(link) {
  const storageRef = ref(storage, link);

  return getDownloadURL(storageRef);
}

export { uploadImage, downloadImage };

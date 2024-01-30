import Resizer from "react-image-file-resizer";

// 이미지 url 뽑아오는 함수
export const resizeUrl = (file, width, height) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      "WEBP",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export const resizeFile = (file, width, height) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      "WEBP",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

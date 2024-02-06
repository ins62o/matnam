import Resizer from "react-image-file-resizer";

// 사용법 : (파일 , 넓이 , 높이 , option (base64 : url , file : 압축된 파일) )
export const resize = (file, width, height, option) =>
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
      option
    );
  });

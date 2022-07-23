import express from 'express';
import sharp from 'sharp';
import path from 'path';
import { readdir } from 'fs';

const originPath = './images/origin/';
const resizedPath = './images/resized/';

export const updateImage = (req: express.Request, res: express.Response) => {
  const sendFileOptions = {
    root: path.join(__dirname, '../images/resized'),
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };
  const imageName = String(req.query.imageName);
  const imageNameWithOutEx = imageName.split('.')[0];
  const width = String(req.query.width);
  const hight = String(req.query.hight);
  const expectedEditedImgName = `${imageNameWithOutEx}_resized_by_${width}_${hight}.png`;
  let cheeckExisting = false;

  if (
    Number.isNaN(Number.parseInt(width, 10)) ||
    Number.isNaN(Number.parseInt(hight, 10)) ||
    imageName == 'undefined'
  ) {
    res.status(303).send('image param not valied');
  } else {
    getImgFilesFromDir(resizedPath, (files) => {
      files.forEach((file) => {
        if (file == expectedEditedImgName) {
          console.log('Image founded');
          cheeckExisting = true;
          res.status(200).sendFile(expectedEditedImgName, sendFileOptions);
        }
      });

      if (!cheeckExisting) {
        console.log('Image not founded');
        resizeImage({ imageName, width, hight }, (error, savedName) => {
          if (error) {
            getImgFilesFromDir(originPath, (files) => {
              res.render('index', { files, error });
            });
          } else {
            res.sendFile(savedName, sendFileOptions);
          }
        });
      }
    });
  }
};

export const resizeImage = async (
  imageData: { imageName: string; width: string; hight: string },
  cb: (flag: string, savedName: string) => void
) => {
  const imageSplitName = imageData.imageName.split('.');
  const imgFinalName = `${imageSplitName[0]}_resized_by_${imageData.width}_${imageData.hight}.png`;
  try {
    await sharp(originPath + imageData.imageName)
      .resize(Number(imageData.hight), Number(imageData.hight))
      .png()
      .toFile(resizedPath + imgFinalName);
    cb('', imgFinalName);
  } catch (error) {
    cb('An error occurred processing the image', '');
  }
};
export const getImgFilesFromDir = async (
  dirPath: string,
  cb: (files: string[]) => void
) => {
  await readdir(
    dirPath,
    (err: NodeJS.ErrnoException | null, files: string[]) => {
      if (err) throw err;
      cb(files);
    }
  );
};

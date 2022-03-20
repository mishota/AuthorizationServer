import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const fs = require('fs');
// const FileType = require('file-type');

import path = require('path');

type validTypeExtension = 'png' | 'jpg' | 'jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validTypeExtensions: validTypeExtension[] = ['png', 'jpg', 'jpeg'];
const validMimeTypes: validMimeType[] = ['image/png', 'image/jpg', 'image/jpeg'];


export const saveImageToStorage = {
   storage: diskStorage({
      destination: './avatars',
      filename: (req, file, cb) => {
         const fileExtension: string = path.extname(file.originalname);
         const fileName: string = uuidv4() + fileExtension;
         cb(null, fileName);
      }
   }),
   // fileFilter: (req, file, cb) => {
   //    const allowedMimeTypes: validMimeType[] = validMimeTypes;
   //    allowedMimeTypes.includes(file.mimeType) ? cb(null, true) : cb(null, false)
   // }
}
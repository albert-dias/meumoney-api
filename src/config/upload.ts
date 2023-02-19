import {S3Client} from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import crypto from 'crypto';
import multer from 'multer';
import path from 'path';
import { Request } from 'express';

const tpmFolder = path.resolve(__dirname, "..", "..", "tmp");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
        accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`
    },
});

const storageTypes = {
    local: multer.diskStorage({
        destination: tpmFolder,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        }
    }),
    s3: multerS3({
        s3,
        bucket: `${process.env.AWS_BUCKET}`,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key(req, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;
            
            return callback(null, fileName);
        },
    }),
};

export default {
    directory: tpmFolder,
    storage: storageTypes.s3,
    limits: {
        fileSize: 12 * 1024 * 1024,
    },
    fileFilter: (req: Request, file: any, callback: any) => {
        const allowedMines = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'application/pdf',
            'application/zip',
            'application/xlxs',
        ];

        if(allowedMines.includes(file.mimetype)){
            callback(null, true)
        }else{
            callback(new Error("Invalid file Type"));
        }
    },
}
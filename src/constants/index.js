import path from 'node:path';


export const ENV_VARS = {
    PORT: 'PORT',
    MONGODB_USER: 'MONGODB_USER',
    MONGODB_PASSWORD: 'MONGODB_PASSWORD',
    MONGODB_URL: 'MONGODB_URL',
    MONGODB_DB: 'MONGODB_DB',
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',
    JWT_SECRET: 'JWT_SECRET',
    FRONTEND_HOST: 'FRONTEND_HOST',
    APP_DOMAIN: 'APP_DOMAIN',
    CLOUDINARY_NAME: 'CLOUDINARY_NAME',
    CLOUDINARY_API_KEY: 'CLOUDINARY_API_KEY',
    CLOUDINARY_API_SECRET: 'CLOUDINARY_API_SECRET',
    IS_CLOUDINARY_ENABLED: 'IS_CLOUDINARY_ENABLED',
};

export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc',
};

export const ACCESS_TOKEN_TTL = 15 * 60 * 1000;
export const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60 * 1000;

export const TEMPLATE_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'upload');

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');




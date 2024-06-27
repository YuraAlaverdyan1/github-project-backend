import dotenv from 'dotenv';
dotenv.config();

export const CORE = {
    PORT: process.env.PORT || 3000
};

export const GIT_TOKENS = {
    TOKEN: process.env.GIT_TOKEN
};
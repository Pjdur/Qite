import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const fsPromises = {
    readFile: promisify(fs.readFile),
    writeFile: promisify(fs.writeFile),
    readdir: promisify(fs.readdir),
    stat: promisify(fs.stat),
};

export const readFileAsync = async (filePath: string): Promise<string> => {
    try {
        return await fsPromises.readFile(filePath, 'utf-8');
    } catch (error) {
        throw new Error(`Error reading file at ${filePath}: ${error.message}`);
    }
};

export const writeFileAsync = async (filePath: string, data: string): Promise<void> => {
    try {
        await fsPromises.writeFile(filePath, data, 'utf-8');
    } catch (error) {
        throw new Error(`Error writing file at ${filePath}: ${error.message}`);
    }
};

export const readDirectoryAsync = async (dirPath: string): Promise<string[]> => {
    try {
        return await fsPromises.readdir(dirPath);
    } catch (error) {
        throw new Error(`Error reading directory at ${dirPath}: ${error.message}`);
    }
};

export const getFileStatsAsync = async (filePath: string): Promise<fs.Stats> => {
    try {
        return await fsPromises.stat(filePath);
    } catch (error) {
        throw new Error(`Error getting stats for file at ${filePath}: ${error.message}`);
    }
};

export const getAbsolutePath = (relativePath: string): string => {
    return path.resolve(__dirname, relativePath);
};
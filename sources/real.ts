import * as fs from "fs";

import * as main from "./main";

function toString(path: main.Path | string): string {
    return path instanceof main.Path ? path.toString() : path;
}

export class FileSystem extends main.FileSystem {
    /**
     * Get whether or not the Volume at the provided path exists.
     * @param volumePath The path to the Volume.
     */
    public volumeExists(volumePath: main.Path | string): boolean {
        let result: boolean = false;

        const path: main.Path = main.toPath(volumePath);
        if (path) {
            const rootPath: main.Path = path.getRootPath();
            if (rootPath) {
                result = fs.existsSync(rootPath.toString());
            }
        }

        return result;
    }

    /**
     * Get whether or not the Folder at the provided path exists.
     * @param folderPath The path to the Folder.
     */
    public folderExists(folderPath: main.Path | string): boolean {
        let result: boolean = false;

        const folderPathString: string = toString(folderPath);
        if (folderPathString) {
            const folderStats: fs.Stats = fs.statSync(folderPathString);
            result = folderStats ? folderStats.isDirectory() : false;
        }

        return result;
    }

    /**
     * Get whether or not the file at the provided path exists.
     * @param filePath The path to the file.
     */
    public fileExists(filePath: main.Path | string): boolean {
        let result: boolean = false;

        const filePathString: string = toString(filePath);
        if (filePathString) {
            const fileStats: fs.Stats = fs.statSync(filePathString);
            result = fileStats ? fileStats.isFile() : false;
        }

        return result;
    }
}
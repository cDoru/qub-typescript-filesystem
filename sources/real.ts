import * as fs from "fs";

import * as main from "./main";

export class FileSystem extends main.FileSystem {
    /**
     * Get whether or not the Root at the provided path exists.
     * @param rootPath The path to the Root.
     */
    public rootExists(rootPath: main.Path | string): boolean {
        let result: boolean = false;

        const path: main.Path = main.toPath(rootPath);
        if (path) {
            const trimmedRootPath: main.Path = path.getRootPath();
            if (trimmedRootPath) {
                result = fs.existsSync(trimmedRootPath.toString());
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

        const folderPathString: string = main.toString(folderPath);
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

        const filePathString: string = main.toString(filePath);
        if (filePathString) {
            const fileStats: fs.Stats = fs.statSync(filePathString);
            result = fileStats ? fileStats.isFile() : false;
        }

        return result;
    }

    /**
     * Read the contents of the file at the provided filePath as a UTF-8 string. If the file doesn't
     * exist, then undefined will be returned.
     */
    public readFileContentsAsString(filePath: main.Path | string): string {
        let result: string;

        const filePathString: string = main.toString(filePath);
        if (filePathString) {
            try {
                result = fs.readFileSync(filePathString, { encoding: "utf8" });
            }
            catch (error) {
                // The file doesn't exist or can't be read.
            }
        }

        return result;
    }

    /**
     * Write the provided string contents to the file at the provided file path using UTF-8
     * encoding. If the file doesn't exist, then it will be created.
     */
    public writeFileContentsAsString(filePath: main.Path | string, fileContents: string): void {
        const path: main.Path = main.toPath(filePath);
        if (path && path.toString()) {
            fs.writeFileSync(path.toString(), fileContents, { encoding: "utf8" });
        }
    }
}
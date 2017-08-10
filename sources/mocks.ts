import * as qub from "qub";

import * as main from "./main";

export class FileSystem extends main.FileSystem {
    private _volumes = new qub.ArrayList<main.Path>();
    private _folders = new qub.ArrayList<main.Path>();
    private _files = new qub.ArrayList<main.Path>();

    /**
     * Get whether or not the Volume at the provided path exists.
     * @param volumePath The path to the Volume.
     */
    public volumeExists(volumePath: main.Path | string): boolean {
        return false;
    }

    /**
     * Get whether or not the Folder at the provided path exists.
     * @param folderPath The path to the Folder.
     */
    public folderExists(folderPath: main.Path | string): boolean {
        return false;
    }

    /**
     * Get whether or not the file at the provided path exists.
     * @param filePath The path to the file.
     */
    public fileExists(filePath: main.Path | string): boolean {
        return false;
    }
}
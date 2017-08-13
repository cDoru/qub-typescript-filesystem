import * as qub from "qub";

import * as main from "./main";

export class FileSystem extends main.FileSystem {
    private _volumes = new qub.ArrayList<Volume>();

    public getMockVolume(volumePath: main.Path | string): Volume {
        const path: main.Path = main.toPath(volumePath);
        const rootPath: main.Path = path.getRootPath();
        return !rootPath ? undefined : this._volumes.first((volume: Volume) => volume.getPath().equals(rootPath));
    }

    /**
     * Get whether or not the Volume at the provided path exists.
     * @param volumePath The path to the Volume.
     */
    public volumeExists(volumePath: main.Path | string): boolean {
        return !!this.getMockVolume(volumePath);
    }

    /**
     * Create a volume at the provided volumePath in this mock FileSystem.
     * @param volumePath The path to the volume to create.
     */
    public createMockVolume(volumePath: main.Path | string): Volume {
        let result: Volume = this.getMockVolume(volumePath);
        if (!result && volumePath) {
            result = new Volume(volumePath);
            this._volumes.add(result);
        }
        return result;
    }

    /**
     * Get whether or not the Folder at the provided path exists.
     * @param folderPath The path to the Folder.
     */
    public folderExists(folderPath: main.Path | string): boolean {
        const path: main.Path = main.toPath(folderPath);

        let result: boolean = false;
        let currentContainer: Container = this.getMockVolume(path);
        if (currentContainer) {
            const pathSegments: qub.Iterable<string> = path.skipRootPath().getSegments();

            if (pathSegments.any()) {
                const folderNames: qub.Iterator<string> = pathSegments.iterate();
                while (currentContainer && folderNames.next()) {
                    currentContainer = currentContainer.getFolder(folderNames.getCurrent());
                }
                result = currentContainer ? true : false;
            }
        }

        return result;
    }

    /**
     * Get whether or not the file at the provided path exists.
     * @param filePath The path to the file.
     */
    public fileExists(filePath: main.Path | string): boolean {
        const path: main.Path = main.toPath(filePath);

        let result: boolean = false;
        const pathString: string = path.toString();
        if (pathString && !pathString.endsWith("/") && !pathString.endsWith("\\")) {
            let currentContainer: Container = this.getMockVolume(path);
            if (currentContainer) {
                const pathSegments: qub.Iterable<string> = path.skipRootPath().getSegments();
                const folderNames: qub.Iterator<string> = pathSegments.skipLast(1).iterate();
                while (currentContainer && folderNames.next()) {
                    currentContainer = currentContainer.getFolder(folderNames.getCurrent());
                }

                if (currentContainer) {
                    const fileName: string = pathSegments.last();
                    result = currentContainer.getFile(fileName) ? true : false;
                }
            }
        }

        return result;
    }
}

export interface Container {
    getFolder(folderName: string): Folder;

    createFolder(folderName: string): Folder;

    getFile(fileName: string): File;

    createFile(fileName: string): File;
}

export class Volume implements Container {
    private _path: main.Path;
    private _folders = new qub.ArrayList<Folder>();
    private _files = new qub.ArrayList<File>();

    constructor(path: main.Path | string) {
        this._path = main.toPath(path);
    }

    public getName(): string {
        return this._path.toString();
    }

    public getPath(): main.Path {
        return this._path;
    }

    public getFolder(folderName: string): Folder {
        return this._folders.first((folder: Folder) => folder.getName() === folderName);
    }

    public createFolder(folderName: string): Folder {
        let result: Folder = this.getFolder(folderName);
        if (!result && folderName) {
            result = new Folder(this._path.add(folderName));
            this._folders.add(result);
        }
        return result;
    }

    public getFile(fileName: string): File {
        return this._files.first((file: File) => file.getName() === fileName);
    }

    public createFile(fileName: string): File {
        let result: File = this.getFile(fileName);
        if (!result && fileName) {
            result = new File(this._path.add(fileName));
            this._files.add(result);
        }
        return result;
    }
}

export class Folder implements Container {
    private _path: main.Path;
    private _folders = new qub.ArrayList<Folder>();
    private _files = new qub.ArrayList<File>();

    constructor(path: main.Path | string) {
        this._path = main.toPath(path);
    }

    public getName(): string {
        return this._path.skipRootPath().getSegments().last();
    }

    public getPath(): main.Path {
        return this._path;
    }

    public getFolder(folderName: string): Folder {
        return this._folders.first((folder: Folder) => folder.getName() === folderName);
    }

    public createFolder(folderName: string): Folder {
        let result: Folder = this.getFolder(folderName);
        if (!result && folderName) {
            result = new Folder(this._path.add(folderName));
            this._folders.add(result);
        }
        return result;
    }

    public getFile(fileName: string): File {
        return this._files.first((file: File) => file.getName() === fileName);
    }

    public createFile(fileName: string): File {
        let result: File = this.getFile(fileName);
        if (!result && fileName) {
            result = new File(this._path.add(fileName));
            this._files.add(result);
        }
        return result;
    }
}

export class File {
    private _path: main.Path;

    constructor(path: main.Path | string) {
        this._path = main.toPath(path);
    }

    public getName(): string {
        return this._path.getSegments().last();
    }
}
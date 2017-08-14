import * as qub from "qub";

import * as main from "./main";

export class FileSystem extends main.FileSystem {
    private _roots = new qub.ArrayList<Root>();

    public getMockRoot(rootPath: main.Path | string): Root {
        const path: main.Path = main.toPath(rootPath);
        const trimmedRootPath: main.Path = path.getRootPath();
        return !trimmedRootPath ? undefined : this._roots.first((root: Root) => root.getPath().equals(trimmedRootPath));
    }

    public getMockContainer(containerPath: main.Path | string): Container {
        const path: main.Path = main.toPath(containerPath);

        let result: Container = this.getMockRoot(path);
        if (result) {
            const pathSegments: qub.Iterable<string> = path.skipRootPath().getSegments();

            if (pathSegments.any()) {
                const folderNames: qub.Iterator<string> = pathSegments.iterate();
                while (result && folderNames.next()) {
                    result = result.getFolder(folderNames.getCurrent());
                }
            }
        }

        return result;
    }

    public getMockFolder(folderPath: main.Path | string): Folder {
        const container: Container = this.getMockContainer(folderPath);
        return container instanceof Folder ? container : undefined;
    }

    public getMockFile(filePath: main.Path | string): File {
        const path: main.Path = main.toPath(filePath);

        let result: File;
        if (path && path.toString()) {
            const containerPath: main.Path = path.getParentPath();
            if (containerPath) {
                const container: Container = this.getMockContainer(containerPath);
                if (container) {
                    result = container.getFile(path.getSegments().last());
                }
            }
        }

        return result;
    }

    /**
     * Get whether or not the Root at the provided path exists.
     * @param rootPath The path to the Root.
     */
    public rootExists(rootPath: main.Path | string): boolean {
        return !!this.getMockRoot(rootPath);
    }

    /**
     * Create a root at the provided rootPath in this mock FileSystem.
     * @param rootPath The path to the root to create.
     */
    public createMockRoot(rootPath: main.Path | string): Root {
        let result: Root = this.getMockRoot(rootPath);
        if (!result && rootPath) {
            result = new Root(rootPath);
            this._roots.add(result);
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
        let currentContainer: Container = this.getMockRoot(path);
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

    public deleteFolder(folderPath: main.Path | string): boolean {
        let result: boolean = false;

        const path: main.Path = main.toPath(folderPath);
        if (path && path.toString()) {
            const parentPath: main.Path = path.getParentPath();
            if (parentPath && parentPath.toString()) {
                const parent: Container = this.getMockContainer(parentPath);
                if (parent) {
                    const folderName: string = path.skipRootPath().getSegments().last();
                    result = parent.deleteFolder(folderName);
                }
            }
        }

        return result;
    }

    /**
     * Create the folder at the provided path. All folders in the provided path will be created. The
     * return value will be whether or not the folder was created as a result of this call.
     * @param folderPath The path to the folder to create.
     */
    public createFolder(folderPath: main.Path | string): boolean {
        let result: boolean = false;

        const path: main.Path = main.toPath(folderPath);
        if (path && path.toString()) {
            const containerPath: main.Path = path.getParentPath();
            if (containerPath && containerPath.toString()) {
                let currentContainer: Container = this.createMockRoot(containerPath.getRootPath());

                const folderNames: qub.Iterable<string> = containerPath.skipRootPath().getSegments();
                for (const folderName of folderNames) {
                    currentContainer = currentContainer.createFolder(folderName);
                }

                const folderName: string = path.skipRootPath().getSegments().last();
                if (!currentContainer.getFolder(folderName)) {
                    result = true;
                    currentContainer.createFolder(folderName);
                }
            }
        }

        return result;
    }

    /**
     * Create the file at the provided path. All folders in the provided path will be created. The
     * return value will be whether or not the file was created as a result of this call.
     * @param filePath The path to the file to create.
     */
    public createFile(filePath: main.Path | string): boolean {
        let result: boolean = false;

        const path: main.Path = main.toPath(filePath);
        if (path && path.toString()) {
            const containerPath: main.Path = path.getParentPath();
            if (containerPath && containerPath.toString()) {
                let currentContainer: Container = this.createMockRoot(containerPath.getRootPath());

                const folderNames: qub.Iterable<string> = containerPath.skipRootPath().getSegments();
                for (const folderName of folderNames) {
                    currentContainer = currentContainer.createFolder(folderName);
                }

                const fileName: string = path.skipRootPath().getSegments().last();
                if (!currentContainer.getFile(fileName)) {
                    result = true;
                    currentContainer.createFile(fileName);
                }
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
            let currentContainer: Container = this.getMockRoot(path);
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

    public deleteFile(filePath: main.Path | string): boolean {
        let result: boolean = false;

        const path: main.Path = main.toPath(filePath);
        if (path && path.toString()) {
            const parentPath: main.Path = path.getParentPath();
            if (parentPath && parentPath.toString()) {
                const parent: Container = this.getMockContainer(parentPath);
                if (parent) {
                    const fileName: string = path.skipRootPath().getSegments().last();
                    result = parent.deleteFile(fileName);
                }
            }
        }

        return result;
    }

    /**
     * Read the contents of the file at the provided filePath as a UTF-8 string. If the file doesn't
     * exist, then undefined will be returned.
     */
    public readFileContentsAsString(filePath: main.Path | string): string {
        const file: File = this.getMockFile(filePath);
        return file ? file.getContentsAsString() : undefined;
    }

    /**
     * Write the provided string contents to the file at the provided file path using UTF-8
     * encoding. If the file doesn't exist, then it will be created.
     */
    public writeFileContentsAsString(filePath: main.Path | string, fileContents: string): void {
        const path: main.Path = main.toPath(filePath);
        if (path && path.toString()) {
            const containerPath: main.Path = path.getParentPath();
            if (containerPath && containerPath.toString()) {
                let currentContainer: Container = this.createMockRoot(containerPath.getRootPath());

                const folderNames: qub.Iterable<string> = containerPath.skipRootPath().getSegments();
                for (const folderName of folderNames) {
                    currentContainer = currentContainer.createFolder(folderName);
                }

                const file: File = currentContainer.createFile(path.getSegments().last());
                file.setContentsAsString(fileContents);
            }
        }
    }
}

export interface Container {
    getFolder(folderName: string): Folder;

    createFolder(folderName: string): Folder;

    deleteFolder(folderName: string): boolean;

    getFile(fileName: string): File;

    createFile(fileName: string): File;

    deleteFile(fileName: string): boolean;
}

export class Root implements Container {
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

    public deleteFolder(folderName: string): boolean {
        let result: boolean = false;

        const foldersCount: number = this._folders.getCount();
        for (let i = 0; i < foldersCount; ++i) {
            const folder: Folder = this._folders.get(i);
            if (folder.getName() === folderName) {
                result = true;
                this._folders.removeAt(i);
                break;
            }
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

    public deleteFile(fileName: string): boolean {
        let result: boolean = false;

        const fileCount: number = this._files.getCount();
        for (let i = 0; i < fileCount; ++i) {
            const file: File = this._files.get(i);
            if (file.getName() === fileName) {
                result = true;
                this._files.removeAt(i);
                break;
            }
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

    public deleteFolder(folderName: string): boolean {
        let result: boolean = false;

        const foldersCount: number = this._folders.getCount();
        for (let i = 0; i < foldersCount; ++i) {
            const folder: Folder = this._folders.get(i);
            if (folder.getName() === folderName) {
                result = true;
                this._folders.removeAt(i);
                break;
            }
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

    public deleteFile(fileName: string): boolean {
        let result: boolean = false;

        const fileCount: number = this._files.getCount();
        for (let i = 0; i < fileCount; ++i) {
            const file: File = this._files.get(i);
            if (file.getName() === fileName) {
                result = true;
                this._files.removeAt(i);
                break;
            }
        }

        return result;
    }
}

export class File {
    private _path: main.Path;
    private _contents: string;

    constructor(path: main.Path | string) {
        this._path = main.toPath(path);
        this._contents = "";
    }

    public getName(): string {
        return this._path.getSegments().last();
    }

    public getContentsAsString(): string {
        return this._contents;
    }

    public setContentsAsString(contents: string): void {
        this._contents = contents ? contents : "";
    }
}
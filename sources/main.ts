import * as os from "os";
import * as qub from "qub";

/**
 * A set of functions for interacting with the file system.
 */
export abstract class FileSystem {
    /**
     * Get a reference to the folder at the provided path.
     * @param folderPath The path to the folder.
     */
    public getFolder(folderPath: Path | string): Folder {
        return new Folder(this, folderPath instanceof Path ? folderPath : new Path(folderPath));
    }

    /**
     * Get a reference to the file at the provided path.
     * @param filePath The path to the file.
     */
    public getFile(filePath: Path | string): Folder {
        return new Folder(this, filePath instanceof Path ? filePath : new Path(filePath));
    }

    /**
     * Get a reference to the home folder for the current user.
     */
    public abstract getHomeFolder(): Folder;

    /**
     * Get whether or not the Volume at the provided path exists.
     * @param volumePath The path to the Volume.
     */
    public abstract volumeExists(volumePath: Path | string): boolean;

    /**
     * Get whether or not the Folder at the provided path exists.
     * @param folderPath The path to the Folder.
     */
    public abstract folderExists(folderPath: Path | string): boolean;

    /**
     * Get whether or not the file at the provided path exists.
     * @param filePath The path to the file.
     */
    public abstract fileExists(filePath: Path | string): boolean;
}

/**
 * A path to a Volume, Folder, or File in a FileSystem.
 */
export class Path {
    constructor(private _pathString: string) {
    }

    /**
     * Get the string representation of this Path.
     */
    public toString(): string {
        return this._pathString;
    }

    /**
     * Get the Path to the parent Folder or Volume of this Path.
     */
    public getParentPath(): Path {
        return undefined;
    }
}

/**
 * An individual entry within a FileSystem (such as a Folder or a File).
 */
export interface FileSystemEntry {
    /**
     * Get the Path to this FileSystemEntry.
     */
    getPath(): Path;

    /**
     * Get a reference to this FileSystemEntry's parent container.
     */
    getParent(): FileSystemEntryContainer;

    /**
     * Get whether or not this FileSystemEntry exists.
     */
    exists(): boolean;
}

/**
 * An interface for a FileSystemEntry that can contain other FileSystemEntries (such as a Folder or
 * a Volume).
 */
export interface FileSystemEntryContainer extends FileSystemEntry {
}

/**
 * A Volume (or Drive) in a FileSystem.
 */
export class Volume implements FileSystemEntryContainer {
    constructor(private _fileSystem: FileSystem, private _path: Path) {
    }

    /**
     * Get the Path to this Volume.
     */
    public getPath(): Path {
        return this._path;
    }

    /**
     * Get the parent container of this Volume. This will always return undefined since a volume is
     * a top-level construct in the FileSystem.
     */
    public getParent(): FileSystemEntryContainer {
        return getParentContainer(this._path, this._fileSystem);
    }

    /**
     * Get whether or not this Volume exists.
     */
    public exists(): boolean {
        return this._fileSystem.volumeExists(this._path);
    }
}

/**
 * Get the parent FileSystemEntryContainer for the provided entryPath within the provided
 * fileSystem.
 * @param entryPath The path to the FileSystemEntry.
 * @param fileSystem The FileSystem that the entryPath belongs to.
 */
function getParentContainer(entryPath: Path, fileSystem: FileSystem): FileSystemEntryContainer {
    let result: FileSystemEntryContainer;

    const parentPath: Path = this._path.getParentPath();
    if (parentPath) {
        if (parentPath.getParentPath()) {
            result = new Folder(fileSystem, parentPath);
        }
        else {
            result = new Volume(fileSystem, parentPath);
        }
    }

    return result;
}

/**
 * A Folder (or Directory) in a Volume (or Drive) in a FileSystem.
 */
export class Folder implements FileSystemEntryContainer {
    constructor(private _fileSystem: FileSystem, private _path: Path) {
    }

    /**
     * Get the Path to this Folder.
     */
    public getPath(): Path {
        return this._path;
    }

    /**
     * Get the parent container of this Folder.
     */
    public getParent(): FileSystemEntryContainer {
        return getParentContainer(this._path, this._fileSystem);
    }

    /**
     * Get whether or not this Folder exists.
     */
    public exists(): boolean {
        return this._fileSystem.folderExists(this._path);
    }
}

/**
 * A File in a Volume (or Drive) in a FileSystem.
 */
export class File implements FileSystemEntry {
    constructor(private _fileSystem: FileSystem, private _path: Path) {
    }

    /**
     * Get the Path to this File.
     */
    public getPath(): Path {
        return this._path;
    }

    /**
     * Get the parent container of this File.
     */
    public getParent(): FileSystemEntryContainer {
        return getParentContainer(this._path, this._fileSystem);
    }

    public exists(): boolean {
        return this._fileSystem.fileExists(this._path);
    }
}
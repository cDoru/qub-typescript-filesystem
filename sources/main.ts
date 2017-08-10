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
    public getHomeFolder(): Folder {
        return this.getFolder(os.homedir());
    }

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
     * Get the normalized path of the provided pathString. A normalized path replaces all
     * backslashes ("\") with forward slashes ("/") and removes any trailing slashes, unless the
     * trailing slash is the root slash (such as "/" or "C:/").
     * @param pathString The pathString to normalize.
     */
    public static normalizePathString(pathString: string): string {
        let result: string = pathString;

        if (pathString) {
            result = "";

            let previousCharacterWasSlash: boolean = false;
            for (const character of pathString) {
                if (character === "\\") {
                    if (!previousCharacterWasSlash) {
                        result += "/";
                        previousCharacterWasSlash = true;
                    }
                }
                else {
                    if (character === "/") {
                        if (!previousCharacterWasSlash) {
                            result += character;
                            previousCharacterWasSlash = true;
                        }
                    }
                    else {
                        result += character;
                        previousCharacterWasSlash = false;
                    }
                }
            }

            if (result.endsWith("/") && result.length >= 2 && result[result.length - 2] !== ":") {
                result = result.substring(0, result.length - 1);
            }
        }

        return result;
    }

    /**
     * Get the path to the parent of this path. If this path points at a root path (such as "/" or
     * "C:/"), then undefined will be returned.
     */
    public static getParentPathString(pathString: string): string {
        let parentPathString: string;


        if (pathString) {
            let i: number = pathString.length - 1;

            // Skip trailing slashes.
            while (i >= 0 && (pathString[i] === "/" || pathString[i] === "\\")) {
                --i;
            }

            // If the pathString wasn't full of slashes and we're not pointing at the last character
            // of a drive name ("C:").
            if (i >= 0 && pathString[i] !== ":") {
                // Skip folder name.
                while (i >= 0 && pathString[i] !== "/" && pathString[i] !== "\\") {
                    --i;
                }

                // Skip trailing slashes again, except for root slash (such as "/" or "C:/").
                while (i >= 1 && (pathString[i] === "/" || pathString[i] === "\\") && pathString[i - 1] !== ":") {
                    --i;
                }

                parentPathString = pathString.substring(0, i + 1);
            }
        }

        return parentPathString;
    }

    /**
     * Get the normalized version of this path. All backslashes will be converted to forward
     * slashes, and any trailing slashes will be removed.
     */
    public normalize(): Path {
        const pathString: string = this.toString();
        const normalizedPathString: string = Path.normalizePathString(pathString);
        return pathString === normalizedPathString ? this : new Path(normalizedPathString);
    }

    /**
     * Get the path to the parent of this path. If this path points at only a root (such as "/" or
     * "C:/"), then undefined will be returned.
     */
    public getParentPath(): Path {
        const parentPathString: string = Path.getParentPathString(this._pathString);
        return parentPathString ? new Path(parentPathString) : undefined;
    }

    /**
     * Get the string representation of this Path.
     */
    public toString(): string {
        return this._pathString;
    }

    public equals(rhs: Path): boolean {
        return !rhs ? false : Path.normalizePathString(this._pathString) === Path.normalizePathString(rhs._pathString);
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
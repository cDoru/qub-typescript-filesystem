import * as os from "os";
import * as qub from "qub";

/**
 * Ensure that the provided value is a Path.
 * @param path The path to ensure is a Path.
 */
export function toPath(path: Path | string): Path {
    return path instanceof Path ? path : new Path(path);
}

/**
 * A set of functions for interacting with the file system.
 */
export abstract class FileSystem {
    public getVolume(volumePath: Path | string): Volume {
        return volumePath && volumePath.toString() ? new Volume(this, toPath(volumePath)) : undefined;
    }

    /**
     * Get a reference to the folder at the provided path.
     * @param folderPath The path to the folder.
     */
    public getFolder(folderPath: Path | string): Folder {
        return folderPath && folderPath.toString() ? new Folder(this, toPath(folderPath)) : undefined;
    }

    /**
     * Get a reference to the file at the provided path.
     * @param filePath The path to the file.
     */
    public getFile(filePath: Path | string): File {
        let result: File;

        if (filePath) {
            const filePathString: string = filePath.toString();
            if (filePathString && !filePathString.endsWith("/") && !filePathString.endsWith("\\")) {
                result = new File(this, toPath(filePath));
            }
        }

        return result;
    }

    /**
     * Get a reference to the current user's home folder.
     */
    public getUserHomeFolder(): Folder {
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
     * Get the volume name, folder names, and/or file name that exists in this path.
     */
    public getSegments(): qub.Iterable<string> {
        const normalizedPathString: string = Path.normalizePathString(this._pathString);
        const segmentsArray: string[] = normalizedPathString ? normalizedPathString.split("/") : [];
        return new qub.ArrayList<string>(segmentsArray).where((segment: string) => segment.length > 0);
    }

    /**
     * Add the provided segment (folder name or file name) to this Path.
     * @param segment The segment (folder name or file name) to add to this Path.
     */
    public add(segment: string): Path {
        let result: Path = this;
        if (segment) {
            let resultPathString: string = this._pathString;
            if (!resultPathString) {
                resultPathString = segment;
            }
            else {
                if (!resultPathString.endsWith("/") && !resultPathString.endsWith("\\")) {
                    resultPathString += "/";
                }
                resultPathString += segment;
            }
            result = new Path(resultPathString);
        }
        return result;
    }

    /**
     * Get whether or not this Path has a Volume specified.
     */
    public isRooted(): boolean {
        return !!this.getRootPathString();
    }

    /**
     * Get the path string of the root Volume of this Path, if it exists.
     */
    public getRootPathString(): string {
        let result: string;
        if (this._pathString) {
            let slashIndex: number = 0;
            while (slashIndex < this._pathString.length && this._pathString[slashIndex] !== "/" && this._pathString[slashIndex] !== "\\") {
                ++slashIndex;
            }

            if (slashIndex === 0) {
                result = this._pathString[0];
            }
            else if (this._pathString[slashIndex - 1] === ":") {
                if (slashIndex < this._pathString.length) {
                    // If the slashIndex is less than pathString's length, then the slashIndex is
                    // pointing at a slash. Let's include the slash in our substring.
                    ++slashIndex;
                }
                result = this._pathString.substring(0, slashIndex);
            }
        }
        return result;
    }

    /**
     * Get the path of the root Volume of this Path, if it exists.
     */
    public getRootPath(): Path {
        const rootPathString: string = this.getRootPathString();
        return rootPathString ? new Path(rootPathString) : undefined;
    }

    /**
     * Get a Path that is the same as this Path except without the root path.
     */
    public skipRootPath(): Path {
        let result: Path;
        const rootPathString: string = this.getRootPathString();
        if (!rootPathString) {
            result = this;
        }
        else {
            const skippedRootPathString: string = this._pathString.substring(rootPathString.length);
            result = new Path(skippedRootPathString);
        }
        return result;
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
export interface Entry {
    /**
     * Get the Path to this FileSystemEntry.
     */
    getPath(): Path;

    /**
     * Get a reference to this FileSystemEntry's parent container.
     */
    getParent(): Container;

    /**
     * Get whether or not this FileSystemEntry exists.
     */
    exists(): boolean;
}

/**
 * An interface for an Entry that can contain other Entries (such as a Folder or File).
 */
export interface Container extends Entry {
}

/**
 * A Volume (or Drive) in a FileSystem.
 */
export class Volume implements Container {
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
    public getParent(): Container {
        return undefined;
    }

    /**
     * Get whether or not this Volume exists.
     */
    public exists(): boolean {
        return this._fileSystem.volumeExists(this._path);
    }
}

/**
 * Get the parent Container for the provided entryPath within the provided fileSystem.
 * @param entryPath The path to the Entry.
 * @param fileSystem The FileSystem that the entryPath belongs to.
 */
function getParentContainer(entryPath: Path, fileSystem: FileSystem): Container {
    const parentPath: Path = entryPath.getParentPath();
    return parentPath.getParentPath() ? new Folder(fileSystem, parentPath) : new Volume(fileSystem, parentPath);
}

/**
 * A Folder (or Directory) in a Volume (or Drive) in a FileSystem.
 */
export class Folder implements Container {
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
    public getParent(): Container {
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
export class File implements Entry {
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
    public getParent(): Container {
        return getParentContainer(this._path, this._fileSystem);
    }

    /**
     * Get whether or not this File exists.
     */
    public exists(): boolean {
        return this._fileSystem.fileExists(this._path);
    }
}
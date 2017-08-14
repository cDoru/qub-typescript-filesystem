import * as assert from "assert";
import * as os from "os";
import * as qub from "qub";

import * as main from "../sources/main";
import * as mock from "../sources/mock";

suite("mock", () => {
    suite("FileSystem", () => {
        suite("getMockContainer()", () => {
            test(`with no roots and undefined path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockContainer(undefined), undefined);
            });

            test(`with roots and undefined path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockContainer(undefined), undefined);
            });

            test(`with no roots and null path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockContainer(null), undefined);
            });

            test(`with roots and null path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockContainer(null), undefined);
            });

            test(`with no roots and empty path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockContainer(""), undefined);
            });

            test(`with roots and empty path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockContainer(""), undefined);
            });

            test(`with no roots and not matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockContainer("A:/"), undefined);
            });

            test(`with roots and not matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockContainer("A:/"), undefined);
            });

            test(`with no roots and matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockContainer("C:/"), undefined);
            });

            test(`with roots and matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockContainer("C:/"), new mock.Root("C:/"));
            });

            test(`with roots and non-matching folder path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockContainer("C:/nope"), undefined);
            });

            test(`with roots and matching folder path`, () => {
                const mockFileSystem = new mock.FileSystem();
                const root: mock.Root = mockFileSystem.createMockRoot("C:/");
                root.createFolder("nope");
                assert.deepStrictEqual(mockFileSystem.getMockContainer("C:/nope"), new mock.Folder("C:/nope"));
            });
        });

        suite("getMockFolder()", () => {
            test(`with no roots and undefined path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockFolder(undefined), undefined);
            });

            test(`with roots and undefined path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockFolder(undefined), undefined);
            });

            test(`with no roots and null path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockFolder(null), undefined);
            });

            test(`with roots and null path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockFolder(null), undefined);
            });

            test(`with no roots and empty path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockFolder(""), undefined);
            });

            test(`with roots and empty path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockFolder(""), undefined);
            });

            test(`with no roots and not matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockFolder("A:/"), undefined);
            });

            test(`with roots and not matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockFolder("A:/"), undefined);
            });

            test(`with no roots and matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockFolder("C:/"), undefined);
            });

            test(`with roots and matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockFolder("C:/"), undefined);
            });

            test(`with roots and non-matching folder path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockFolder("C:/nope"), undefined);
            });

            test(`with roots and matching folder path`, () => {
                const mockFileSystem = new mock.FileSystem();
                const root: mock.Root = mockFileSystem.createMockRoot("C:/");
                root.createFolder("nope");
                assert.deepStrictEqual(mockFileSystem.getMockFolder("C:/nope"), new mock.Folder("C:/nope"));
            });
        });

        suite("getMockFile()", () => {
            test(`with no roots and undefined path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockFile(undefined), undefined);
            });

            test(`with roots and undefined path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockFile(undefined), undefined);
            });

            test(`with no roots and null path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockFile(null), undefined);
            });

            test(`with roots and null path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockFile(null), undefined);
            });

            test(`with no roots and empty path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockFile(""), undefined);
            });

            test(`with roots and empty path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockFile(""), undefined);
            });

            test(`with no roots and not matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockFile("A:/"), undefined);
            });

            test(`with roots and not matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockFile("A:/"), undefined);
            });

            test(`with no roots and matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockFile("C:/"), undefined);
            });

            test(`with roots and matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockFile("C:/"), undefined);
            });

            test(`with roots and non-matching folder path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockFile("C:/nope"), undefined);
            });

            test(`with roots and matching folder path`, () => {
                const mockFileSystem = new mock.FileSystem();
                const root: mock.Root = mockFileSystem.createMockRoot("C:/");
                root.createFolder("nope");
                assert.deepStrictEqual(mockFileSystem.getMockFile("C:/nope"), undefined);
            });

            test(`with roots and matching file path`, () => {
                const mockFileSystem = new mock.FileSystem();
                const root: mock.Root = mockFileSystem.createMockRoot("C:/");
                root.createFile("nope");
                assert.deepStrictEqual(mockFileSystem.getMockFile("C:/nope"), new mock.File("C:/nope"));
            });

            test(`with missing folder and non-matching file path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockFile("C:/nope/ishere"), undefined);
            });

            test(`with folders and non-matching file path`, () => {
                const mockFileSystem = new mock.FileSystem();
                const root: mock.Root = mockFileSystem.createMockRoot("C:/");
                root.createFolder("nope");
                assert.deepStrictEqual(mockFileSystem.getMockFile("C:/nope/ishere"), undefined);
            });

            test(`with folders and matching file path`, () => {
                const mockFileSystem = new mock.FileSystem();
                const root: mock.Root = mockFileSystem.createMockRoot("C:/");
                const nope: mock.Folder = root.createFolder("nope");
                nope.createFile("ishere");
                assert.deepStrictEqual(mockFileSystem.getMockFile("C:/nope/ishere"), new mock.File("C:/nope/ishere"));
            });
        });

        suite("getMockRoot()", () => {
            test(`with no roots and undefined path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockRoot(undefined), undefined);
            });

            test(`with roots and undefined path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockRoot(undefined), undefined);
            });

            test(`with no roots and null path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockRoot(null), undefined);
            });

            test(`with roots and null path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockRoot(null), undefined);
            });

            test(`with no roots and empty path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockRoot(""), undefined);
            });

            test(`with roots and empty path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockRoot(""), undefined);
            });

            test(`with no roots and not matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockRoot("A:/"), undefined);
            });

            test(`with roots and not matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockRoot("A:/"), undefined);
            });

            test(`with no roots and matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockRoot("C:/"), undefined);
            });

            test(`with roots and matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockRoot("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockRoot("C:/"), new mock.Root("C:/"));
            });
        });

        suite("rootExists()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.rootExists(undefined), false);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.rootExists(null), false);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.rootExists(""), false);
            });

            test(`with "/" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.rootExists("/"), false);
            });

            test(`with "/" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.createMockRoot("/");
                assert.deepStrictEqual(fileSystem.rootExists("/"), true);
            });
        });

        suite("createMockRoot()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                const createdRoot: mock.Root = fileSystem.createMockRoot(undefined);
                assert.deepStrictEqual(createdRoot, undefined);
                assert.deepStrictEqual(fileSystem.getMockRoot(undefined), undefined);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                const createdRoot: mock.Root = fileSystem.createMockRoot(null);
                assert.deepStrictEqual(createdRoot, undefined);
                assert.deepStrictEqual(fileSystem.getMockRoot(null), undefined);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                const createdRoot: mock.Root = fileSystem.createMockRoot("");
                assert.deepStrictEqual(createdRoot, undefined);
                assert.deepStrictEqual(fileSystem.getMockRoot(""), undefined);
            });

            test(`with "Y:\\"`, () => {
                const fileSystem = new mock.FileSystem();
                const createdRoot: mock.Root = fileSystem.createMockRoot("Y:\\");
                assert.deepStrictEqual(createdRoot, new mock.Root("Y:\\"));
                assert.deepStrictEqual(fileSystem.getMockRoot("Y:\\"), new mock.Root("Y:\\"));
            });
        });

        suite("folderExists()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.folderExists(undefined), false);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.folderExists(null), false);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.folderExists(""), false);
            });

            test(`with "/" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.folderExists("/"), false);
            });

            test(`with "/" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.createMockRoot("/");
                assert.deepStrictEqual(fileSystem.folderExists("/"), false);
            });

            test(`with "/hello" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.folderExists("/hello"), false);
            });

            test(`with "/hello" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                const Root: mock.Root = fileSystem.createMockRoot("/");
                Root.createFolder("hello");
                assert.deepStrictEqual(fileSystem.folderExists("/hello"), true);
            });

            test(`with "/hello/there" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                const Root: mock.Root = fileSystem.createMockRoot("/");
                Root.createFolder("hello");
                assert.deepStrictEqual(fileSystem.folderExists("/hello/there"), false);
            });

            test(`with "/hello/there" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                const Root: mock.Root = fileSystem.createMockRoot("/");
                const hello: mock.Folder = Root.createFolder("hello");
                hello.createFolder("there");
                assert.deepStrictEqual(fileSystem.folderExists("/hello/there"), true);
            });
        });

        suite("createFolder()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.createFolder(undefined), false);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.createFolder(null), false);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.createFolder(""), false);
            });

            test(`with "folder"`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.createFolder("folder"), false);
            });

            test(`with "/folder" when root doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.rootExists("/"), false);
                assert.deepStrictEqual(fileSystem.folderExists("/folder"), false);

                assert.deepStrictEqual(fileSystem.createFolder("/folder"), true);

                assert.deepStrictEqual(fileSystem.rootExists("/"), true);
                assert.deepStrictEqual(fileSystem.folderExists("/folder"), true);
            });
        });

        suite("fileExists()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.fileExists(undefined), false);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.fileExists(null), false);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.fileExists(""), false);
            });

            test(`with "/" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.fileExists("/"), false);
            });

            test(`with "/" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.createMockRoot("/");
                assert.deepStrictEqual(fileSystem.fileExists("/"), false);
            });

            test(`with "/hello" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.fileExists("/hello"), false);
            });

            test(`with "/hello" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                const Root: mock.Root = fileSystem.createMockRoot("/");
                Root.createFile("hello");
                assert.deepStrictEqual(fileSystem.fileExists("/hello"), true);
            });

            test(`with "/hello/there" when "hello" doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.createMockRoot("/");
                assert.deepStrictEqual(fileSystem.fileExists("/hello/there"), false);
            });

            test(`with "/hello/there" when "there" doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                const Root: mock.Root = fileSystem.createMockRoot("/");
                Root.createFolder("hello");
                assert.deepStrictEqual(fileSystem.fileExists("/hello/there"), false);
            });

            test(`with "/hello/there" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                const Root: mock.Root = fileSystem.createMockRoot("/");
                const hello: mock.Folder = Root.createFolder("hello");
                hello.createFile("there");
                assert.deepStrictEqual(fileSystem.fileExists("/hello/there"), true);
            });
        });

        suite("readFileContentsAsString()", () => {
            test("when root doesn't exist", () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/file.txt"), undefined);
            });

            test("when file exists under root with no content", () => {
                const fileSystem = new mock.FileSystem();
                const root: mock.Root = fileSystem.createMockRoot("/");
                root.createFile("file.txt");
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/file.txt"), "");
            });

            test("when file exists under root with content", () => {
                const fileSystem = new mock.FileSystem();
                const root: mock.Root = fileSystem.createMockRoot("/");
                const file: mock.File = root.createFile("file.txt");
                file.setContentsAsString("hello there!");
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/file.txt"), "hello there!");
            });

            test("when parent folder doesn't exist", () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.createMockRoot("/");
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/folder/file.txt"), undefined);
            });

            test("when parent folder exists, but file doesn't exist", () => {
                const fileSystem = new mock.FileSystem();
                const root: mock.Root = fileSystem.createMockRoot("/");
                root.createFolder("folder");
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/folder/file.txt"), undefined);
            });

            test("when parent folder and file both exist, but file has no content", () => {
                const fileSystem = new mock.FileSystem();
                const root: mock.Root = fileSystem.createMockRoot("/");
                const folder: mock.Folder = root.createFolder("folder");
                folder.createFile("file.txt");
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/folder/file.txt"), "");
            });

            test("when parent folder and file both exist, but file has no content", () => {
                const fileSystem = new mock.FileSystem();
                const root: mock.Root = fileSystem.createMockRoot("/");
                const folder: mock.Folder = root.createFolder("folder");
                const file: mock.File = folder.createFile("file.txt");
                file.setContentsAsString("I did it again!");
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/folder/file.txt"), "I did it again!");
            });
        });

        suite("writeFileContentsAsString()", () => {
            test(`with undefined filePath`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.writeFileContentsAsString(undefined, "A");
            });

            test(`with null filePath`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.writeFileContentsAsString(null, "A");
            });

            test(`with root filePath`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.writeFileContentsAsString("/", "A");
            });

            test("when root doesn't exist", () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.writeFileContentsAsString("/file.txt", "A");
                assert.deepStrictEqual(fileSystem.rootExists("/"), true);
                assert.deepStrictEqual(fileSystem.fileExists("/file.txt"), true);
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/file.txt"), "A");
            });

            test("when file exists under root with no content", () => {
                const fileSystem = new mock.FileSystem();
                const root: mock.Root = fileSystem.createMockRoot("/");
                root.createFile("file.txt");
                fileSystem.writeFileContentsAsString("/file.txt", "B");
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/file.txt"), "B");
            });

            test("when file exists under root with content", () => {
                const fileSystem = new mock.FileSystem();
                const root: mock.Root = fileSystem.createMockRoot("/");
                const file: mock.File = root.createFile("file.txt");
                file.setContentsAsString("hello there!");
                fileSystem.writeFileContentsAsString("/file.txt", "C");
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/file.txt"), "C");
            });

            test("when parent folder doesn't exist", () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.createMockRoot("/");
                fileSystem.writeFileContentsAsString("/folder/file.txt", "D");
                assert.deepStrictEqual(fileSystem.folderExists("/folder"), true);
                assert.deepStrictEqual(fileSystem.fileExists("/folder/file.txt"), true);
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/folder/file.txt"), "D");
            });

            test("when parent folder exists, but file doesn't exist", () => {
                const fileSystem = new mock.FileSystem();
                const root: mock.Root = fileSystem.createMockRoot("/");
                root.createFolder("folder");
                fileSystem.writeFileContentsAsString("/folder/file.txt", "E");
                assert.deepStrictEqual(fileSystem.fileExists("/folder/file.txt"), true);
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/folder/file.txt"), "E");
            });

            test("when parent folder and file both exist, but file has no content", () => {
                const fileSystem = new mock.FileSystem();
                const root: mock.Root = fileSystem.createMockRoot("/");
                const folder: mock.Folder = root.createFolder("folder");
                folder.createFile("file.txt");
                fileSystem.writeFileContentsAsString("/folder/file.txt", "F");
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/folder/file.txt"), "F");
            });

            test("when parent folder and file both exist and file has content", () => {
                const fileSystem = new mock.FileSystem();
                const root: mock.Root = fileSystem.createMockRoot("/");
                const folder: mock.Folder = root.createFolder("folder");
                const file: mock.File = folder.createFile("file.txt");
                file.setContentsAsString("I did it again!");
                fileSystem.writeFileContentsAsString("/folder/file.txt", "G");
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/folder/file.txt"), "G");
            });

            test("when parent folder and file both exist and file has content, but new content is undefined", () => {
                const fileSystem = new mock.FileSystem();
                const root: mock.Root = fileSystem.createMockRoot("/");
                const folder: mock.Folder = root.createFolder("folder");
                const file: mock.File = folder.createFile("file.txt");
                file.setContentsAsString("I did it again!");
                fileSystem.writeFileContentsAsString("/folder/file.txt", undefined);
                assert.deepStrictEqual(fileSystem.readFileContentsAsString("/folder/file.txt"), "");
            });
        });

        suite("getRoot()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getRoot(undefined), undefined);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getRoot(null), undefined);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getRoot(""), undefined);
            });

            test(`with "/" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getRoot("/"), new main.Root(fileSystem, new main.Path("/")));
            });

            test(`with "/" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.createMockRoot("/");
                assert.deepStrictEqual(fileSystem.getRoot("/"), new main.Root(fileSystem, new main.Path("/")));
            });
        });

        suite("getFolder()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getFolder(undefined), undefined);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getFolder(null), undefined);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getFolder(""), undefined);
            });

            test(`with "/" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getFolder("/"), new main.Folder(fileSystem, new main.Path("/")));
            });

            test(`with "/" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.createMockRoot("/");
                assert.deepStrictEqual(fileSystem.getFolder("/"), new main.Folder(fileSystem, new main.Path("/")));
            });

            test(`with "/hello" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getFolder("/hello"), new main.Folder(fileSystem, new main.Path("/hello")));
            });

            test(`with "/hello" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                const Root: mock.Root = fileSystem.createMockRoot("/");
                Root.createFolder("hello");
                assert.deepStrictEqual(fileSystem.getFolder("/hello"), new main.Folder(fileSystem, new main.Path("/hello")));
            });
        });

        suite("getFile()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getFile(undefined), undefined);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getFile(null), undefined);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getFile(""), undefined);
            });

            test(`with "/" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getFile("/"), undefined);
            });

            test(`with "/" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.createMockRoot("/");
                assert.deepStrictEqual(fileSystem.getFile("/"), undefined);
            });

            test(`with "\\" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getFile("\\"), undefined);
            });

            test(`with "\\" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.createMockRoot("/");
                assert.deepStrictEqual(fileSystem.getFile("\\"), undefined);
            });

            test(`with "/hello" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getFile("/hello"), new main.File(fileSystem, new main.Path("/hello")));
            });

            test(`with "/hello" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                const Root: mock.Root = fileSystem.createMockRoot("/");
                Root.createFile("hello");
                assert.deepStrictEqual(fileSystem.getFile("/hello"), new main.File(fileSystem, new main.Path("/hello")));
            });
        });

        test("getUserHomeFolder()", () => {
            const fileSystem = new mock.FileSystem();
            const userHomeFolder: main.Folder = fileSystem.getUserHomeFolder();
            assert.notDeepStrictEqual(userHomeFolder, undefined);
            assert.deepStrictEqual(userHomeFolder.getPath(), new main.Path(os.homedir()));
        });
    });

    suite("Root", () => {
        suite("constructor()", () => {
            function constructorTest(path: string): void {
                test(`with ${qub.escapeAndQuote(path)}`, () => {
                    const Root = new mock.Root(path);
                    assert.deepStrictEqual(Root.getPath(), main.toPath(path));
                });
            }

            constructorTest(undefined);
            constructorTest(null);
            constructorTest("");
            constructorTest("C:/");
            constructorTest("/a/b/c");
            constructorTest("/");
            constructorTest("\\");
        });

        suite("getName()", () => {
            function getNameTest(path: string): void {
                test(`with ${qub.escapeAndQuote(path)}`, () => {
                    const Root = new mock.Root(path);
                    assert.deepStrictEqual(Root.getName(), path);
                });
            }

            getNameTest(undefined);
            getNameTest(null);
            getNameTest("");
            getNameTest("C:/");
            getNameTest("/a/b/c");
            getNameTest("/");
            getNameTest("\\");
        });

        suite("getFolder()", () => {
            function getFolderTest(folderName: string, folderExists: boolean = false): void {
                test(`with folder name ${qub.escapeAndQuote(folderName)} that ${folderExists ? "exists" : "doesn't exist"}`, () => {
                    const RootPath = new main.Path("C:/");
                    const Root = new mock.Root(RootPath);

                    if (folderExists && folderName) {
                        Root.createFolder(folderName);
                    }

                    const folder: mock.Folder = Root.getFolder(folderName);
                    assert.deepStrictEqual(folder, folderExists ? new mock.Folder(RootPath.add(folderName)) : undefined);
                });
            }

            getFolderTest(undefined);
            getFolderTest(null);
            getFolderTest("");
            getFolderTest("abc");
            getFolderTest("abc", true);
        });

        suite("createFolder()", () => {
            test(`with undefined`, () => {
                const Root = new mock.Root("/");
                const createdFolder: mock.Folder = Root.createFolder(undefined);
                assert.deepStrictEqual(createdFolder, undefined);
                assert.deepStrictEqual(Root.getFolder(undefined), undefined);
            });

            test(`with null`, () => {
                const Root = new mock.Root("/");
                const createdFolder: mock.Folder = Root.createFolder(null);
                assert.deepStrictEqual(createdFolder, undefined);
                assert.deepStrictEqual(Root.getFolder(null), undefined);
            });

            test(`with ""`, () => {
                const Root = new mock.Root("/");
                const createdFolder: mock.Folder = Root.createFolder("");
                assert.deepStrictEqual(createdFolder, undefined);
                assert.deepStrictEqual(Root.getFolder(""), undefined);
            });

            test(`with "a"`, () => {
                const Root = new mock.Root("/");
                const createdFolder: mock.Folder = Root.createFolder("a");
                assert.deepStrictEqual(createdFolder, new mock.Folder("/a"));
                assert.deepStrictEqual(Root.getFolder("a"), new mock.Folder("/a"));
            });
        });

        suite("getFile()", () => {
            function getFileTest(fileName: string, fileExists: boolean = false): void {
                test(`with file name ${qub.escapeAndQuote(fileName)} that ${fileExists ? "exists" : "doesn't exist"}`, () => {
                    const RootPath = new main.Path("C:/");
                    const Root = new mock.Root(RootPath);

                    if (fileExists && fileName) {
                        Root.createFile(fileName);
                    }

                    const file: mock.File = Root.getFile(fileName);
                    assert.deepStrictEqual(file, fileExists ? new mock.File(RootPath.add(fileName)) : undefined);
                });
            }

            getFileTest(undefined);
            getFileTest(null);
            getFileTest("");
            getFileTest("abc");
            getFileTest("abc", true);
        });

        suite("createFile()", () => {
            test(`with undefined`, () => {
                const Root = new mock.Root("/");
                const createdFile: mock.File = Root.createFile(undefined);
                assert.deepStrictEqual(createdFile, undefined);
                assert.deepStrictEqual(Root.getFile(undefined), undefined);
            });

            test(`with null`, () => {
                const Root = new mock.Root("/");
                const createdFile: mock.File = Root.createFile(null);
                assert.deepStrictEqual(createdFile, undefined);
                assert.deepStrictEqual(Root.getFile(null), undefined);
            });

            test(`with ""`, () => {
                const Root = new mock.Root("/");
                const createdFile: mock.File = Root.createFile("");
                assert.deepStrictEqual(createdFile, undefined);
                assert.deepStrictEqual(Root.getFile(""), undefined);
            });

            test(`with "a"`, () => {
                const Root = new mock.Root("/");
                const createdFile: mock.File = Root.createFile("a");
                assert.deepStrictEqual(createdFile, new mock.File("/a"));
                assert.deepStrictEqual(Root.getFile("a"), new mock.File("/a"));
            });
        });
    });

    suite("Folder", () => {
        suite("constructor()", () => {
            function constructorTest(path: string): void {
                test(`with ${qub.escapeAndQuote(path)}`, () => {
                    const folder = new mock.Folder(path);
                    assert.deepStrictEqual(folder.getPath(), main.toPath(path));
                });
            }

            constructorTest(undefined);
            constructorTest(null);
            constructorTest("");
            constructorTest("C:/");
            constructorTest("/a/b/c");
            constructorTest("/");
            constructorTest("\\");
        });

        suite("getName()", () => {
            function getNameTest(path: string, expectedName: string): void {
                test(`with ${qub.escapeAndQuote(path)}`, () => {
                    const folder = new mock.Folder(path);
                    assert.deepStrictEqual(folder.getName(), expectedName);
                });
            }

            getNameTest(undefined, undefined);
            getNameTest(null, undefined);
            getNameTest("", undefined);
            getNameTest("C:/", undefined);
            getNameTest("/a/b/c", "c");
            getNameTest("/", undefined);
            getNameTest("\\", undefined);
        });

        suite("getFolder()", () => {
            function getFolderTest(folderName: string, folderExists: boolean = false): void {
                test(`with folder name ${qub.escapeAndQuote(folderName)} that ${folderExists ? "exists" : "doesn't exist"}`, () => {
                    const folderPath = new main.Path("C:/folder1");
                    const folder1 = new mock.Folder(folderPath);

                    if (folderExists && folderName) {
                        folder1.createFolder(folderName);
                    }

                    const folder2: mock.Folder = folder1.getFolder(folderName);
                    assert.deepStrictEqual(folder2, folderExists ? new mock.Folder(folderPath.add(folderName)) : undefined);
                });
            }

            getFolderTest(undefined);
            getFolderTest(null);
            getFolderTest("");
            getFolderTest("abc");
            getFolderTest("abc", true);
        });

        suite("createFolder()", () => {
            test(`with undefined`, () => {
                const folder = new mock.Folder("/");
                const createdFolder: mock.Folder = folder.createFolder(undefined);
                assert.deepStrictEqual(createdFolder, undefined);
                assert.deepStrictEqual(folder.getFolder(undefined), undefined);
            });

            test(`with null`, () => {
                const folder = new mock.Folder("/");
                const createdFolder: mock.Folder = folder.createFolder(null);
                assert.deepStrictEqual(createdFolder, undefined);
                assert.deepStrictEqual(folder.getFolder(null), undefined);
            });

            test(`with ""`, () => {
                const folder = new mock.Folder("/");
                const createdFolder: mock.Folder = folder.createFolder("");
                assert.deepStrictEqual(createdFolder, undefined);
                assert.deepStrictEqual(folder.getFolder(""), undefined);
            });

            test(`with "a"`, () => {
                const folder = new mock.Folder("/");
                const createdFolder: mock.Folder = folder.createFolder("a");
                assert.deepStrictEqual(createdFolder, new mock.Folder("/a"));
                assert.deepStrictEqual(folder.getFolder("a"), new mock.Folder("/a"));
            });
        });

        suite("getFile()", () => {
            function getFileTest(fileName: string, fileExists: boolean = false): void {
                test(`with file name ${qub.escapeAndQuote(fileName)} that ${fileExists ? "exists" : "doesn't exist"}`, () => {
                    const folderPath = new main.Path("C:/");
                    const folder = new mock.Folder(folderPath);

                    if (fileExists && fileName) {
                        folder.createFile(fileName);
                    }

                    const file: mock.File = folder.getFile(fileName);
                    assert.deepStrictEqual(file, fileExists ? new mock.File(folderPath.add(fileName)) : undefined);
                });
            }

            getFileTest(undefined);
            getFileTest(null);
            getFileTest("");
            getFileTest("abc");
            getFileTest("abc", true);
        });

        suite("createFile()", () => {
            test(`with undefined`, () => {
                const folder = new mock.Folder("/");
                const createdFile: mock.File = folder.createFile(undefined);
                assert.deepStrictEqual(createdFile, undefined);
                assert.deepStrictEqual(folder.getFile(undefined), undefined);
            });

            test(`with null`, () => {
                const folder = new mock.Folder("/");
                const createdFile: mock.File = folder.createFile(null);
                assert.deepStrictEqual(createdFile, undefined);
                assert.deepStrictEqual(folder.getFile(null), undefined);
            });

            test(`with ""`, () => {
                const folder = new mock.Folder("/");
                const createdFile: mock.File = folder.createFile("");
                assert.deepStrictEqual(createdFile, undefined);
                assert.deepStrictEqual(folder.getFile(""), undefined);
            });

            test(`with "a"`, () => {
                const folder = new mock.Folder("/");
                const createdFile: mock.File = folder.createFile("a");
                assert.deepStrictEqual(createdFile, new mock.File("/a"));
                assert.deepStrictEqual(folder.getFile("a"), new mock.File("/a"));
            });
        });
    });
});
import * as assert from "assert";
import * as os from "os";
import * as qub from "qub";

import * as main from "../sources/main";
import * as mock from "../sources/mock";

suite("mock", () => {
    suite("FileSystem", () => {
        suite("getMockVolume()", () => {
            test(`with no volumes and undefined path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockVolume(undefined), undefined);
            });

            test(`with volumes and undefined path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockVolume("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockVolume(undefined), undefined);
            });

            test(`with no volumes and null path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockVolume(null), undefined);
            });

            test(`with volumes and null path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockVolume("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockVolume(null), undefined);
            });

            test(`with no volumes and empty path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockVolume(""), undefined);
            });

            test(`with volumes and empty path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockVolume("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockVolume(""), undefined);
            });

            test(`with no volumes and not matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockVolume("A:/"), undefined);
            });

            test(`with volumes and not matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockVolume("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockVolume("A:/"), undefined);
            });

            test(`with no volumes and matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                assert.deepStrictEqual(mockFileSystem.getMockVolume("C:/"), undefined);
            });

            test(`with volumes and matching path`, () => {
                const mockFileSystem = new mock.FileSystem();
                mockFileSystem.createMockVolume("C:/");
                assert.deepStrictEqual(mockFileSystem.getMockVolume("C:/"), new mock.Volume("C:/"));
            });
        });

        suite("volumeExists()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.volumeExists(undefined), false);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.volumeExists(null), false);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.volumeExists(""), false);
            });

            test(`with "/" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.volumeExists("/"), false);
            });

            test(`with "/" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.createMockVolume("/");
                assert.deepStrictEqual(fileSystem.volumeExists("/"), true);
            });
        });

        suite("createMockVolume()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                const createdVolume: mock.Volume = fileSystem.createMockVolume(undefined);
                assert.deepStrictEqual(createdVolume, undefined);
                assert.deepStrictEqual(fileSystem.getMockVolume(undefined), undefined);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                const createdVolume: mock.Volume = fileSystem.createMockVolume(null);
                assert.deepStrictEqual(createdVolume, undefined);
                assert.deepStrictEqual(fileSystem.getMockVolume(null), undefined);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                const createdVolume: mock.Volume = fileSystem.createMockVolume("");
                assert.deepStrictEqual(createdVolume, undefined);
                assert.deepStrictEqual(fileSystem.getMockVolume(""), undefined);
            });

            test(`with "Y:\\"`, () => {
                const fileSystem = new mock.FileSystem();
                const createdVolume: mock.Volume = fileSystem.createMockVolume("Y:\\");
                assert.deepStrictEqual(createdVolume, new mock.Volume("Y:\\"));
                assert.deepStrictEqual(fileSystem.getMockVolume("Y:\\"), new mock.Volume("Y:\\"));
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
                fileSystem.createMockVolume("/");
                assert.deepStrictEqual(fileSystem.folderExists("/"), false);
            });

            test(`with "/hello" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.folderExists("/hello"), false);
            });

            test(`with "/hello" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                const volume: mock.Volume = fileSystem.createMockVolume("/");
                volume.createFolder("hello");
                assert.deepStrictEqual(fileSystem.folderExists("/hello"), true);
            });

            test(`with "/hello/there" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                const volume: mock.Volume = fileSystem.createMockVolume("/");
                volume.createFolder("hello");
                assert.deepStrictEqual(fileSystem.folderExists("/hello/there"), false);
            });

            test(`with "/hello/there" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                const volume: mock.Volume = fileSystem.createMockVolume("/");
                const hello: mock.Folder = volume.createFolder("hello");
                hello.createFolder("there");
                assert.deepStrictEqual(fileSystem.folderExists("/hello/there"), true);
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
                fileSystem.createMockVolume("/");
                assert.deepStrictEqual(fileSystem.fileExists("/"), false);
            });

            test(`with "/hello" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.fileExists("/hello"), false);
            });

            test(`with "/hello" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                const volume: mock.Volume = fileSystem.createMockVolume("/");
                volume.createFile("hello");
                assert.deepStrictEqual(fileSystem.fileExists("/hello"), true);
            });

            test(`with "/hello/there" when "hello" doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.createMockVolume("/");
                assert.deepStrictEqual(fileSystem.fileExists("/hello/there"), false);
            });

            test(`with "/hello/there" when "there" doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                const volume: mock.Volume = fileSystem.createMockVolume("/");
                volume.createFolder("hello");
                assert.deepStrictEqual(fileSystem.fileExists("/hello/there"), false);
            });

            test(`with "/hello/there" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                const volume: mock.Volume = fileSystem.createMockVolume("/");
                const hello: mock.Folder = volume.createFolder("hello");
                hello.createFile("there");
                assert.deepStrictEqual(fileSystem.fileExists("/hello/there"), true);
            });
        });

        suite("getVolume()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getVolume(undefined), undefined);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getVolume(null), undefined);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getVolume(""), undefined);
            });

            test(`with "/" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getVolume("/"), new main.Volume(fileSystem, new main.Path("/")));
            });

            test(`with "/" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.createMockVolume("/");
                assert.deepStrictEqual(fileSystem.getVolume("/"), new main.Volume(fileSystem, new main.Path("/")));
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
                fileSystem.createMockVolume("/");
                assert.deepStrictEqual(fileSystem.getFolder("/"), new main.Folder(fileSystem, new main.Path("/")));
            });

            test(`with "/hello" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getFolder("/hello"), new main.Folder(fileSystem, new main.Path("/hello")));
            });

            test(`with "/hello" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                const volume: mock.Volume = fileSystem.createMockVolume("/");
                volume.createFolder("hello");
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
                fileSystem.createMockVolume("/");
                assert.deepStrictEqual(fileSystem.getFile("/"), undefined);
            });

            test(`with "\\" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getFile("\\"), undefined);
            });

            test(`with "\\" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                fileSystem.createMockVolume("/");
                assert.deepStrictEqual(fileSystem.getFile("\\"), undefined);
            });

            test(`with "/hello" when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                assert.deepStrictEqual(fileSystem.getFile("/hello"), new main.File(fileSystem, new main.Path("/hello")));
            });

            test(`with "/hello" when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                const volume: mock.Volume = fileSystem.createMockVolume("/");
                volume.createFile("hello");
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

    suite("Volume", () => {
        suite("constructor()", () => {
            function constructorTest(path: string): void {
                test(`with ${qub.escapeAndQuote(path)}`, () => {
                    const volume = new mock.Volume(path);
                    assert.deepStrictEqual(volume.getPath(), main.toPath(path));
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
                    const volume = new mock.Volume(path);
                    assert.deepStrictEqual(volume.getName(), path);
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
                    const volumePath = new main.Path("C:/");
                    const volume = new mock.Volume(volumePath);

                    if (folderExists && folderName) {
                        volume.createFolder(folderName);
                    }

                    const folder: mock.Folder = volume.getFolder(folderName);
                    assert.deepStrictEqual(folder, folderExists ? new mock.Folder(volumePath.add(folderName)) : undefined);
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
                const volume = new mock.Volume("/");
                const createdFolder: mock.Folder = volume.createFolder(undefined);
                assert.deepStrictEqual(createdFolder, undefined);
                assert.deepStrictEqual(volume.getFolder(undefined), undefined);
            });

            test(`with null`, () => {
                const volume = new mock.Volume("/");
                const createdFolder: mock.Folder = volume.createFolder(null);
                assert.deepStrictEqual(createdFolder, undefined);
                assert.deepStrictEqual(volume.getFolder(null), undefined);
            });

            test(`with ""`, () => {
                const volume = new mock.Volume("/");
                const createdFolder: mock.Folder = volume.createFolder("");
                assert.deepStrictEqual(createdFolder, undefined);
                assert.deepStrictEqual(volume.getFolder(""), undefined);
            });

            test(`with "a"`, () => {
                const volume = new mock.Volume("/");
                const createdFolder: mock.Folder = volume.createFolder("a");
                assert.deepStrictEqual(createdFolder, new mock.Folder("/a"));
                assert.deepStrictEqual(volume.getFolder("a"), new mock.Folder("/a"));
            });
        });

        suite("getFile()", () => {
            function getFileTest(fileName: string, fileExists: boolean = false): void {
                test(`with file name ${qub.escapeAndQuote(fileName)} that ${fileExists ? "exists" : "doesn't exist"}`, () => {
                    const volumePath = new main.Path("C:/");
                    const volume = new mock.Volume(volumePath);

                    if (fileExists && fileName) {
                        volume.createFile(fileName);
                    }

                    const file: mock.File = volume.getFile(fileName);
                    assert.deepStrictEqual(file, fileExists ? new mock.File(volumePath.add(fileName)) : undefined);
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
                const volume = new mock.Volume("/");
                const createdFile: mock.File = volume.createFile(undefined);
                assert.deepStrictEqual(createdFile, undefined);
                assert.deepStrictEqual(volume.getFile(undefined), undefined);
            });

            test(`with null`, () => {
                const volume = new mock.Volume("/");
                const createdFile: mock.File = volume.createFile(null);
                assert.deepStrictEqual(createdFile, undefined);
                assert.deepStrictEqual(volume.getFile(null), undefined);
            });

            test(`with ""`, () => {
                const volume = new mock.Volume("/");
                const createdFile: mock.File = volume.createFile("");
                assert.deepStrictEqual(createdFile, undefined);
                assert.deepStrictEqual(volume.getFile(""), undefined);
            });

            test(`with "a"`, () => {
                const volume = new mock.Volume("/");
                const createdFile: mock.File = volume.createFile("a");
                assert.deepStrictEqual(createdFile, new mock.File("/a"));
                assert.deepStrictEqual(volume.getFile("a"), new mock.File("/a"));
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
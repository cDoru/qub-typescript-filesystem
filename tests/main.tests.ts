import * as assert from "assert";
import * as qub from "qub";

import * as main from "../sources/main";
import * as mock from "../sources/mock";

suite("main", () => {
    suite("toPath()", () => {
        test(`with undefined`, () => {
            assert.deepStrictEqual(main.toPath(undefined), new main.Path(undefined));
        });

        test(`with null`, () => {
            assert.deepStrictEqual(main.toPath(null), new main.Path(null));
        });

        test(`with string ""`, () => {
            assert.deepStrictEqual(main.toPath(""), new main.Path(""));
        });

        test(`with string "hello"`, () => {
            assert.deepStrictEqual(main.toPath("hello"), new main.Path("hello"));
        });

        test(`with path(undefined)`, () => {
            assert.deepStrictEqual(main.toPath(new main.Path(undefined)), new main.Path(undefined));
        });
    });

    suite("toString()", () => {
        test(`with undefined`, () => {
            assert.deepStrictEqual(main.toString(undefined), undefined);
        });

        test(`with null`, () => {
            assert.deepStrictEqual(main.toString(null), null);
        });

        test(`with string ""`, () => {
            assert.deepStrictEqual(main.toString(""), "");
        });

        test(`with string "hello"`, () => {
            assert.deepStrictEqual(main.toString("hello"), "hello");
        });

        test(`with path(undefined)`, () => {
            assert.deepStrictEqual(main.toString(new main.Path(undefined)), undefined);
        });
    });

    suite("Path", () => {
        suite("toString()", () => {
            function toStringTest(pathString: string): void {
                test(`with ${qub.escapeAndQuote(pathString)}`, () => {
                    const path = new main.Path(pathString);
                    assert.deepStrictEqual(path.toString(), pathString);
                });
            }

            toStringTest(undefined);
            toStringTest(null);
            toStringTest("");
            toStringTest(".");
            toStringTest("..");
            toStringTest("/");
            toStringTest("C:/");
            toStringTest("\\");
            toStringTest("D:\\");
        });

        suite("normalize()", () => {
            function normalizeTest(pathString: string, normalizedPathString: string = pathString): void {
                test(`with ${qub.escapeAndQuote(pathString)}`, () => {
                    const path = new main.Path(pathString);
                    const normalizedPath: main.Path = path.normalize();
                    assert.deepStrictEqual(normalizedPath.toString(), normalizedPathString);
                });
            }

            normalizeTest(undefined);
            normalizeTest(null);
            normalizeTest("");
            normalizeTest(".");
            normalizeTest("..");
            normalizeTest("/");
            normalizeTest("C:/");
            normalizeTest("\\", "/");
            normalizeTest("D:\\", "D:/");
            normalizeTest("this/is/a/test///", "this/is/a/test");
            normalizeTest("test/", "test");
            normalizeTest("/a//b///c////", "/a/b/c");
            normalizeTest("\\a\\\\b\\\\\\c\\\\\\\\", "/a/b/c");
        });

        suite("getSegments()", () => {
            function getSegmentsTest(pathString: string, expectedSegments: string[] = []): void {
                test(`with ${qub.escapeAndQuote(pathString)}`, () => {
                    const path = new main.Path(pathString);
                    assert.deepStrictEqual(path.getSegments().toArray(), expectedSegments);
                });
            }

            getSegmentsTest(undefined);
            getSegmentsTest(null);
            getSegmentsTest("");
            getSegmentsTest("/");
            getSegmentsTest("\\");
            getSegmentsTest(" ", [" "]);
            getSegmentsTest("a", ["a"]);
            getSegmentsTest("C:/", ["C:"]);
            getSegmentsTest("C:\\", ["C:"]);
            getSegmentsTest("a/b/c/", ["a", "b", "c"]);
        });

        suite("add()", () => {
            function addTest(pathString: string, segment: string, expectedPathString: string): void {
                test(`with ${qub.escapeAndQuote(pathString)} and ${qub.escapeAndQuote(segment)}`, () => {
                    const path = new main.Path(pathString);
                    const addedPath: main.Path = path.add(segment);
                    assert.deepStrictEqual(addedPath.toString(), expectedPathString);
                });
            }

            addTest(undefined, undefined, undefined);
            addTest(undefined, null, undefined);
            addTest(undefined, "", undefined);
            addTest(undefined, "hello", "hello");
            addTest(undefined, "/hello", "/hello");
            addTest(null, undefined, null);
            addTest(null, null, null);
            addTest(null, "", null);
            addTest(null, "hello", "hello");
            addTest(null, "/hello", "/hello");
            addTest("", undefined, "");
            addTest("", null, "");
            addTest("", "", "");
            addTest("", "hello", "hello");
            addTest("", "/hello", "/hello");
            addTest("/", undefined, "/");
            addTest("/", null, "/");
            addTest("/", "", "/");
            addTest("/", "hello", "/hello");
            addTest("/", "/hello", "//hello");
            addTest("a/b", undefined, "a/b");
            addTest("a/b", null, "a/b");
            addTest("a/b", "", "a/b");
            addTest("a/b", "hello", "a/b/hello");
            addTest("a/b", "/hello", "a/b//hello");
        });

        suite("isRooted()", () => {
            function isRootedTest(pathString: string, expected: boolean): void {
                test(`with ${qub.escapeAndQuote(pathString)}`, () => {
                    const path = new main.Path(pathString);
                    assert.deepStrictEqual(path.isRooted(), expected);
                });
            }

            isRootedTest(undefined, false);
            isRootedTest(null, false);
            isRootedTest("", false);
            isRootedTest(".", false);
            isRootedTest("..", false);
            isRootedTest("a", false);
            isRootedTest("/", true);
            isRootedTest("\\", true);
            isRootedTest("/a/b/c", true);
            isRootedTest("\\a\\b\\c", true);
            isRootedTest("C:", true);
            isRootedTest("D:\\", true);
            isRootedTest("E:/", true);
        });

        suite("getRootPathString()", () => {
            function getRootPathStringTest(pathString: string, expectedRootPathString?: string): void {
                test(`with ${qub.escapeAndQuote(pathString)}`, () => {
                    const path = new main.Path(pathString);
                    assert.deepStrictEqual(path.getRootPathString(), expectedRootPathString);
                });
            }

            getRootPathStringTest(undefined);
            getRootPathStringTest(null);
            getRootPathStringTest("");
            getRootPathStringTest(".");
            getRootPathStringTest("..");
            getRootPathStringTest("a");
            getRootPathStringTest("/", "/");
            getRootPathStringTest("\\", "\\");
            getRootPathStringTest("/a/b/c", "/");
            getRootPathStringTest("\\a\\b\\c", "\\");
            getRootPathStringTest("C:", "C:");
            getRootPathStringTest("D:\\", "D:\\");
            getRootPathStringTest("E:/", "E:/");
            getRootPathStringTest("F:/folder/file.txt", "F:/");
        });

        suite("getRootPath()", () => {
            function getRootPathTest(pathString: string, expectedRootPathString?: string): void {
                test(`with ${qub.escapeAndQuote(pathString)}`, () => {
                    const path = new main.Path(pathString);
                    const rootPath: main.Path = path.getRootPath();
                    const rootPathString: string = rootPath ? rootPath.toString() : undefined;
                    assert.deepStrictEqual(rootPathString, expectedRootPathString);
                });
            }

            getRootPathTest(undefined);
            getRootPathTest(null);
            getRootPathTest("");
            getRootPathTest(".");
            getRootPathTest("..");
            getRootPathTest("a");
            getRootPathTest("/", "/");
            getRootPathTest("\\", "\\");
            getRootPathTest("/a/b/c", "/");
            getRootPathTest("\\a\\b\\c", "\\");
            getRootPathTest("C:", "C:");
            getRootPathTest("D:\\", "D:\\");
            getRootPathTest("E:/", "E:/");
            getRootPathTest("F:/folder/file.txt", "F:/");
        });

        suite("skipRootPath()", () => {
            function skipRootPathTest(pathString: string, expectedSkippedRootPathString: string): void {
                test(`with ${qub.escapeAndQuote(pathString)}`, () => {
                    const path = new main.Path(pathString);
                    const skippedRootPath: main.Path = path.skipRootPath();
                    const skippedRootPathString: string = skippedRootPath ? skippedRootPath.toString() : undefined;
                    assert.deepStrictEqual(skippedRootPathString, expectedSkippedRootPathString);
                });
            }

            skipRootPathTest(undefined, undefined);
            skipRootPathTest(null, null);
            skipRootPathTest("", "");
            skipRootPathTest(".", ".");
            skipRootPathTest("..", "..");
            skipRootPathTest("a", "a");
            skipRootPathTest("/", "");
            skipRootPathTest("\\", "");
            skipRootPathTest("/a/b/c", "a/b/c");
            skipRootPathTest("\\a\\b\\c", "a\\b\\c");
            skipRootPathTest("C:", "");
            skipRootPathTest("D:\\", "");
            skipRootPathTest("E:/", "");
            skipRootPathTest("F:/folder/file.txt", "folder/file.txt");
        });

        suite("getParentPath()", () => {
            function getParentPathTest(pathString: string, expectedParentPathString?: string): void {
                test(`with ${qub.escapeAndQuote(pathString)}`, () => {
                    const path = new main.Path(pathString);
                    const parentPath: main.Path = path.getParentPath();
                    assert.deepStrictEqual(parentPath ? parentPath.toString() : undefined, expectedParentPathString);
                });
            }

            getParentPathTest(undefined);
            getParentPathTest(null);
            getParentPathTest("");
            getParentPathTest("C:/");
            getParentPathTest("C:\\");
            getParentPathTest("/");
            getParentPathTest("\\");
            getParentPathTest("a/b/c", "a/b");
            getParentPathTest("a\\b\\c", "a\\b");
        });

        suite("equals()", () => {
            test(`with "/a/b" and undefined Path`, () => {
                const lhsPath = new main.Path("/a/b");
                const rhsPath: main.Path = undefined;
                assert.deepStrictEqual(lhsPath.equals(rhsPath), false);
            });

            test(`with "/a/b" and null Path`, () => {
                const lhsPath = new main.Path("/a/b");
                const rhsPath: main.Path = null;
                assert.deepStrictEqual(lhsPath.equals(rhsPath), false);
            });

            function equalsTest(lhsPathString: string, rhsPathString: string, expectedEquals: boolean): void {
                test(`with ${qub.escapeAndQuote(lhsPathString)} and ${qub.escapeAndQuote(rhsPathString)}`, () => {
                    const lhsPath = new main.Path(lhsPathString);
                    const rhsPath = new main.Path(rhsPathString);
                    assert.deepStrictEqual(lhsPath.equals(rhsPath), expectedEquals);
                    assert.deepStrictEqual(rhsPath.equals(lhsPath), expectedEquals);
                });
            }

            equalsTest(undefined, undefined, true);
            equalsTest(undefined, null, false);
            equalsTest(undefined, "", false);
            equalsTest(undefined, "A:/", false);
            equalsTest(null, "", false);
            equalsTest(null, "/", false);
            equalsTest("", "", true);
            equalsTest("", "\\a\\b", false);
            equalsTest("C:/", "C:/", true);
            equalsTest("C:/", "C:\\", true);
            equalsTest("C:", "C:/", false);
            equalsTest("C:", "C:\\", false);
            equalsTest("/", "/", true);
            equalsTest("/", "//", true);
            equalsTest("/", "\\", true);
        });
    });

    suite("Root", () => {
        test("when it doesn't exist", () => {
            const fileSystem = new mock.FileSystem();
            const root = new main.Root(fileSystem, new main.Path("C:\\"));
            assert.deepStrictEqual(root.getPath(), new main.Path("C:\\"));
            assert.deepStrictEqual(root.getParent(), undefined);
            assert.deepStrictEqual(root.exists(), false);
        });

        test("when it does exist", () => {
            const fileSystem = new mock.FileSystem();
            fileSystem.createMockRoot("D:/");
            const root = new main.Root(fileSystem, new main.Path("D:/"));
            assert.deepStrictEqual(root.getPath(), new main.Path("D:/"));
            assert.deepStrictEqual(root.getParent(), undefined);
            assert.deepStrictEqual(root.exists(), true);
        });

        suite("getFolder()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                const root: main.Root = fileSystem.getRoot("/");
                const folder: main.Folder = root.getFolder(undefined);
                assert.deepStrictEqual(folder, undefined);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                const root: main.Root = fileSystem.getRoot("/");
                const folder: main.Folder = root.getFolder(null);
                assert.deepStrictEqual(folder, undefined);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                const root: main.Root = fileSystem.getRoot("/");
                const folder: main.Folder = root.getFolder("");
                assert.deepStrictEqual(folder, undefined);
            });

            test(`with "A"`, () => {
                const fileSystem = new mock.FileSystem();
                const root: main.Root = fileSystem.getRoot("/");
                const folder: main.Folder = root.getFolder("A");
                assert.deepStrictEqual(folder, new main.Folder(fileSystem, new main.Path("/A")));
            });
        });

        suite("getFile()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                const root: main.Root = fileSystem.getRoot("/");
                const file: main.File = root.getFile(undefined);
                assert.deepStrictEqual(file, undefined);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                const root: main.Root = fileSystem.getRoot("/");
                const file: main.File = root.getFile(null);
                assert.deepStrictEqual(file, undefined);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                const root: main.Root = fileSystem.getRoot("/");
                const file: main.File = root.getFile("");
                assert.deepStrictEqual(file, undefined);
            });

            test(`with "A"`, () => {
                const fileSystem = new mock.FileSystem();
                const root: main.Root = fileSystem.getRoot("/");
                const file: main.File = root.getFile("A");
                assert.deepStrictEqual(file, new main.File(fileSystem, new main.Path("/A")));
            });

            test(`with "A/"`, () => {
                const fileSystem = new mock.FileSystem();
                const root: main.Root = fileSystem.getRoot("/");
                const file: main.File = root.getFile("A/");
                assert.deepStrictEqual(file, undefined);
            });
        });
    });

    suite("Folder", () => {
        test("when it doesn't exist", () => {
            const fileSystem = new mock.FileSystem();
            const folder = new main.Folder(fileSystem, new main.Path("C:\\a"));
            assert.deepStrictEqual(folder.getPath(), new main.Path("C:\\a"));
            assert.deepStrictEqual(folder.getParent(), new main.Root(fileSystem, new main.Path("C:\\")));
            assert.deepStrictEqual(folder.exists(), false);
        });

        test("when it does exist", () => {
            const fileSystem = new mock.FileSystem();
            const mockRoot: mock.Root = fileSystem.createMockRoot("D:/");
            const mockFolderA: mock.Folder = mockRoot.createFolder("A");
            mockFolderA.createFolder("B");
            const folder = new main.Folder(fileSystem, new main.Path("D:/A/B/"));
            assert.deepStrictEqual(folder.getPath(), new main.Path("D:/A/B/"));
            assert.deepStrictEqual(folder.getParent(), new main.Folder(fileSystem, new main.Path("D:/A")));
            assert.deepStrictEqual(folder.exists(), true);
        });

        suite("getFolder()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                const a: main.Folder = fileSystem.getFolder("/A");
                const folder: main.Folder = a.getFolder(undefined);
                assert.deepStrictEqual(folder, undefined);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                const a: main.Folder = fileSystem.getFolder("/A");
                const folder: main.Folder = a.getFolder(null);
                assert.deepStrictEqual(folder, undefined);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                const a: main.Folder = fileSystem.getFolder("/A");
                const folder: main.Folder = a.getFolder("");
                assert.deepStrictEqual(folder, undefined);
            });

            test(`with "B"`, () => {
                const fileSystem = new mock.FileSystem();
                const a: main.Folder = fileSystem.getFolder("/A");
                const folder: main.Folder = a.getFolder("B");
                assert.deepStrictEqual(folder, new main.Folder(fileSystem, new main.Path("/A/B")));
            });
        });

        suite("getFile()", () => {
            test(`with undefined`, () => {
                const fileSystem = new mock.FileSystem();
                const a: main.Folder = fileSystem.getFolder("/A");
                const file: main.File = a.getFile(undefined);
                assert.deepStrictEqual(file, undefined);
            });

            test(`with null`, () => {
                const fileSystem = new mock.FileSystem();
                const a: main.Folder = fileSystem.getFolder("/A");
                const file: main.File = a.getFile(null);
                assert.deepStrictEqual(file, undefined);
            });

            test(`with ""`, () => {
                const fileSystem = new mock.FileSystem();
                const a: main.Folder = fileSystem.getFolder("/A");
                const file: main.File = a.getFile("");
                assert.deepStrictEqual(file, undefined);
            });

            test(`with "B"`, () => {
                const fileSystem = new mock.FileSystem();
                const a: main.Folder = fileSystem.getFolder("/A");
                const file: main.File = a.getFile("B");
                assert.deepStrictEqual(file, new main.File(fileSystem, new main.Path("/A/B")));
            });

            test(`with "B/"`, () => {
                const fileSystem = new mock.FileSystem();
                const a: main.Folder = fileSystem.getFolder("/A");
                const file: main.File = a.getFile("B/");
                assert.deepStrictEqual(file, undefined);
            });
        });

        suite("delete()", () => {
            test(`when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                const folder: main.Folder = fileSystem.getFolder("/folder");
                assert.deepStrictEqual(folder.exists(), false);
                assert.deepStrictEqual(folder.delete(), false);
                assert.deepStrictEqual(folder.exists(), false);
            });

            test(`when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                const root: mock.Root = fileSystem.createMockRoot("/");
                root.createFolder("folder");
                const folder: main.Folder = fileSystem.getFolder("/folder");
                assert.deepStrictEqual(folder.exists(), true);
                assert.deepStrictEqual(folder.delete(), true);
                assert.deepStrictEqual(folder.exists(), false);
            });
        });
    });

    suite("File", () => {
        test("when it doesn't exist", () => {
            const fileSystem = new mock.FileSystem();
            const file = new main.File(fileSystem, new main.Path("C:\\a"));
            assert.deepStrictEqual(file.getPath(), new main.Path("C:\\a"));
            assert.deepStrictEqual(file.getParent(), new main.Root(fileSystem, new main.Path("C:\\")));
            assert.deepStrictEqual(file.exists(), false);
        });

        test("when it does exist", () => {
            const fileSystem = new mock.FileSystem();
            const mockRoot: mock.Root = fileSystem.createMockRoot("D:/");
            const mockFolderA: mock.Folder = mockRoot.createFolder("A");
            mockFolderA.createFile("B");
            const file = new main.File(fileSystem, new main.Path("D:/A/B"));
            assert.deepStrictEqual(file.getPath(), new main.Path("D:/A/B"));
            assert.deepStrictEqual(file.getParent(), new main.Folder(fileSystem, new main.Path("D:/A")));
            assert.deepStrictEqual(file.exists(), true);
        });

        suite("readContentsAsString()", () => {
            test(`when file doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                const file: main.File = fileSystem.getFile("C:\\folder\file.txt");
                assert.deepStrictEqual(file.readContentsAsString(), undefined);
            });

            test(`when file exists but doesn't have any content`, () => {
                const fileSystem = new mock.FileSystem();
                const file: main.File = fileSystem.getFile("C:\\folder\file.txt");
                file.writeContentsAsString("");
                assert.deepStrictEqual(file.readContentsAsString(), "");
            });

            test(`when file exists and has content`, () => {
                const fileSystem = new mock.FileSystem();
                const file: main.File = fileSystem.getFile("C:\\folder\file.txt");
                file.writeContentsAsString("hello");
                assert.deepStrictEqual(file.readContentsAsString(), "hello");
            });
        });

        suite("delete()", () => {
            test(`when it doesn't exist`, () => {
                const fileSystem = new mock.FileSystem();
                const file: main.File = fileSystem.getFile("/file");
                assert.deepStrictEqual(file.exists(), false);
                assert.deepStrictEqual(file.delete(), false);
                assert.deepStrictEqual(file.exists(), false);
            });

            test(`when it does exist`, () => {
                const fileSystem = new mock.FileSystem();
                const file: main.File = fileSystem.getFile("/file");
                file.writeContentsAsString("");
                assert.deepStrictEqual(file.exists(), true);
                assert.deepStrictEqual(file.delete(), true);
                assert.deepStrictEqual(file.exists(), false);
            });
        });
    });
});
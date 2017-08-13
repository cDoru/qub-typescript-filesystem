import * as assert from "assert";
import * as qub from "qub";

import * as main from "../sources/main";
import * as mock from "../sources/mock";

suite("main", () => {
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

    suite("Volume", () => {
        test("when it doesn't exist", () => {
            const fileSystem = new mock.FileSystem();
            const volume = new main.Volume(fileSystem, new main.Path("C:\\"));
            assert.deepStrictEqual(volume.getPath(), new main.Path("C:\\"));
            assert.deepStrictEqual(volume.getParent(), undefined);
            assert.deepStrictEqual(volume.exists(), false);
        });

        test("when it does exist", () => {
            const fileSystem = new mock.FileSystem();
            fileSystem.createMockVolume("D:/");
            const volume = new main.Volume(fileSystem, new main.Path("D:/"));
            assert.deepStrictEqual(volume.getPath(), new main.Path("D:/"));
            assert.deepStrictEqual(volume.getParent(), undefined);
            assert.deepStrictEqual(volume.exists(), true);
        });
    });

    suite("Folder", () => {
        test("when it doesn't exist", () => {
            const fileSystem = new mock.FileSystem();
            const folder = new main.Folder(fileSystem, new main.Path("C:\\a"));
            assert.deepStrictEqual(folder.getPath(), new main.Path("C:\\a"));
            assert.deepStrictEqual(folder.getParent(), new main.Volume(fileSystem, new main.Path("C:\\")));
            assert.deepStrictEqual(folder.exists(), false);
        });

        test("when it does exist", () => {
            const fileSystem = new mock.FileSystem();
            const mockVolume: mock.Volume = fileSystem.createMockVolume("D:/");
            const mockFolderA: mock.Folder = mockVolume.createFolder("A");
            mockFolderA.createFolder("B");
            const folder = new main.Folder(fileSystem, new main.Path("D:/A/B/"));
            assert.deepStrictEqual(folder.getPath(), new main.Path("D:/A/B/"));
            assert.deepStrictEqual(folder.getParent(), new main.Folder(fileSystem, new main.Path("D:/A")));
            assert.deepStrictEqual(folder.exists(), true);
        });
    });

    suite("File", () => {
        test("when it doesn't exist", () => {
            const fileSystem = new mock.FileSystem();
            const file = new main.File(fileSystem, new main.Path("C:\\a"));
            assert.deepStrictEqual(file.getPath(), new main.Path("C:\\a"));
            assert.deepStrictEqual(file.getParent(), new main.Volume(fileSystem, new main.Path("C:\\")));
            assert.deepStrictEqual(file.exists(), false);
        });

        test("when it does exist", () => {
            const fileSystem = new mock.FileSystem();
            const mockVolume: mock.Volume = fileSystem.createMockVolume("D:/");
            const mockFolderA: mock.Folder = mockVolume.createFolder("A");
            mockFolderA.createFile("B");
            const file = new main.File(fileSystem, new main.Path("D:/A/B"));
            assert.deepStrictEqual(file.getPath(), new main.Path("D:/A/B"));
            assert.deepStrictEqual(file.getParent(), new main.Folder(fileSystem, new main.Path("D:/A")));
            assert.deepStrictEqual(file.exists(), true);
        });
    });
});
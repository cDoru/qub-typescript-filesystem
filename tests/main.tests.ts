import * as assert from "assert";
import * as qub from "qub";

import * as main from "../sources/main";

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
            equalsTest("/", "/", true);
            equalsTest("/", "//", true);
            equalsTest("/", "\\", true);
        });
    });
});
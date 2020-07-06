import * as vscode from "vscode";
import { fileExists, listWithExtension } from "../../utils/FileSystem";
import { getCrate } from "../items/ItemFactory";
import { TreeItem } from "../items/TreeItem";
import { promises } from "fs";

export class WorkspaceProvider implements vscode.TreeDataProvider<TreeItem> {
    private _children: TreeItem[];

    constructor(private rootUri?: vscode.Uri) {
        this._children = [];
    }

    onDidChangeTreeData?:
        | vscode.Event<void | TreeItem | null | undefined>
        | undefined;

    getTreeItem(
        element: TreeItem
    ): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(
        element?: TreeItem | undefined
    ): vscode.ProviderResult<TreeItem[]> {
        if (!this.rootUri) {
            vscode.window.showInformationMessage(
                "No Crates in empty workspace."
            );
            return Promise.resolve([]);
        }

        const cargoTomlUri = vscode.Uri.joinPath(this.rootUri, "Cargo.toml");

        if (element) {
            return Promise.resolve(element.getChildren());
        } else {
            if (this._children.length) {
                return Promise.resolve(this._children);
            } else {
                return Promise.resolve(getCrate(this.rootUri));
            }
        }
        throw new Error("Method not implemented.");
    }
    // throw new Error("Method not implemented.");
}

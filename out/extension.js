"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");
let watch = null;
function activate(context) {
    // 注册命令
    let disposable = vscode.commands.registerCommand('extension.createNuomiFolder', (uri) => {
        // 执行新建文件夹命令
        vscode.commands.executeCommand('explorer.newFolder');
        if (watch) {
            watch.close();
            watch = null;
        }
        // 监听目录变化
        watch = fs.watch(uri.fsPath, (e, filename) => {
            if (e === 'rename') {
                // 获取新建的文件夹路径
                const newFolderPath = path.join(uri.fsPath, filename);
                // 取消监听
                if (watch) {
                    watch.close();
                    watch = null;
                }
                // 将nuomi目录拷贝到新建的文件夹中
                fse.copy(path.join(__dirname, './nuomi'), newFolderPath);
            }
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map
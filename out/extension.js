"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const prettier = __importStar(require("prettier"));
/**
 * Formats arrays within the given text.
 *
 * @param text - The text to format.
 * @returns The formatted text.
 */
function formatCode(text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wrappedArray = `const array = [\n${text}\n];`;
            const formattedWrappedArray = yield prettier.format(wrappedArray, {
                parser: 'babel',
            });
            // Remove the wrapping 'const array = [' and '];'
            const formattedArray = formattedWrappedArray
                .replace(/^const array = \[\s*/, '')
                .replace(/\s*];\s*$/, '');
            const lines = formattedArray.split('\n');
            const minIndent = Math.min(...lines.filter((line) => line.trim()).map((line) => line.search(/\S|$/)));
            const unindentedArray = lines
                .map((line) => line.slice(minIndent))
                .join('\n');
            return unindentedArray;
        }
        catch (error) {
            console.error('Formatting error:', error);
            return text;
        }
    });
}
function activate(context) {
    // formatter
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('array-file', {
        provideDocumentFormattingEdits(document) {
            return __awaiter(this, void 0, void 0, function* () {
                const edits = [];
                const text = document.getText();
                const formattedText = yield formatCode(text);
                const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
                edits.push(vscode.TextEdit.replace(fullRange, formattedText));
                return edits;
            });
        },
    }));
    // Listener for opening .ar files
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument((document) => {
        if (document.languageId === 'array-file' &&
            document.uri.scheme === 'file') {
            const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
            const wrappedText = `const array = [\n${document.getText()}\n];`;
            const edit = vscode.TextEdit.replace(fullRange, wrappedText);
            const workspaceEdit = new vscode.WorkspaceEdit();
            workspaceEdit.set(document.uri, [edit]); // Set the edits
            vscode.workspace.applyEdit(workspaceEdit); // Apply the workspace edit
        }
    }));
    // Listener for saving .ar files
    context.subscriptions.push(vscode.workspace.onWillSaveTextDocument((event) => {
        const { document } = event;
        if (document.languageId === 'arrayfile' &&
            document.uri.scheme === 'file') {
            event.waitUntil(new Promise((resolve) => {
                const text = document.getText();
                const unwrappedText = text.replace(/^const array = \[\n([\s\S]*?)\n\];$/, '$1');
                const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
                const edit = vscode.TextEdit.replace(fullRange, unwrappedText);
                resolve([edit]); // Resolve with an array of TextEdit objects
            }));
        }
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
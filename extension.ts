import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Listener for opening .ar files
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument((document) => {
      if (
        document.languageId === 'arrayfile' &&
        document.uri.scheme === 'file'
      ) {
        const edit = new vscode.WorkspaceEdit();
        const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
        const wrappedText = `const array = [\n${document.getText()}\n];`;
        edit.replace(document.uri, fullRange, wrappedText);
        vscode.workspace.applyEdit(edit);
      }
    })
  );

  // Listener for saving .ar files
  context.subscriptions.push(
    vscode.workspace.onWillSaveTextDocument((event) => {
      const { document } = event;
      if (
        document.languageId === 'arrayfile' &&
        document.uri.scheme === 'file'
      ) {
        event.waitUntil(
          new Promise((resolve) => {
            const edit = new vscode.WorkspaceEdit();
            const text = document.getText();
            const unwrappedText = text.replace(
              /^const array = \[\n([\s\S]*?)\n\];$/,
              '$1'
            );
            const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
            edit.replace(document.uri, fullRange, unwrappedText);
            resolve(edit);
          })
        );
      }
    })
  );
}

export function deactivate() {}

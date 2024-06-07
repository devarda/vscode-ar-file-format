import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Listener for opening .ar files
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument((document) => {
      if (
        document.languageId === 'arrayfile' &&
        document.uri.scheme === 'file'
      ) {
        const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
        const wrappedText = `const array = [\n${document.getText()}\n];`;
        const edit = vscode.TextEdit.replace(fullRange, wrappedText);
        const workspaceEdit = new vscode.WorkspaceEdit();
        workspaceEdit.set(document.uri, [edit]); // Set the edits
        vscode.workspace.applyEdit(workspaceEdit); // Apply the workspace edit
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
          new Promise<vscode.TextEdit[]>((resolve) => {
            const text = document.getText();
            const unwrappedText = text.replace(
              /^const array = \[\n([\s\S]*?)\n\];$/,
              '$1'
            );
            const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
            const edit = vscode.TextEdit.replace(fullRange, unwrappedText);
            resolve([edit]); // Resolve with an array of TextEdit objects
          })
        );
      }
    })
  );
}

export function deactivate() {}

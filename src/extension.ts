import * as vscode from 'vscode';
import * as prettier from 'prettier';

/**
 * Formats arrays within the given text.
 *
 * @param text - The text to format.
 * @returns The formatted text.
 */
async function formatCode(text: string): Promise<string> {
  try {
    const wrappedArray = `const array = [\n${text}\n];`;
    const formattedWrappedArray = await prettier.format(wrappedArray, {
      parser: 'babel',
    });

    // Remove the wrapping 'const array = [' and '];'
    const formattedArray = formattedWrappedArray
      .replace(/^const array = \[\s*/, '')
      .replace(/\s*];\s*$/, '');

    const lines = formattedArray.split('\n');
    const minIndent = Math.min(
      ...lines.filter((line) => line.trim()).map((line) => line.search(/\S|$/))
    );

    const unindentedArray = lines
      .map((line) => line.slice(minIndent))
      .join('\n');

    return unindentedArray;
  } catch (error) {
    console.error('Formatting error:', error);
    return text;
  }
}

export function activate(context: vscode.ExtensionContext) {
  // formatter
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider('array-file', {
      async provideDocumentFormattingEdits(
        document: vscode.TextDocument
      ): Promise<vscode.TextEdit[]> {
        const edits: vscode.TextEdit[] = [];
        const text = document.getText();
        const formattedText = await formatCode(text);
        const fullRange = new vscode.Range(
          document.positionAt(0),
          document.positionAt(text.length)
        );
        edits.push(vscode.TextEdit.replace(fullRange, formattedText));
        return edits;
      },
    })
  );
  // Listener for opening .ar files
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument((document) => {
      if (
        document.languageId === 'array-file' &&
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

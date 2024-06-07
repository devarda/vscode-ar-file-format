# ar-file-format-support README

This is the README for your extension "ar-file-format-support", which provides support for the .ar file format. This custom file format treats files as JavaScript arrays without the usual wrapping brackets `[` and `]`. This extension seamlessly integrates with VSCode, offering a unique way to handle these array files.

## Features

"ar-file-format-support" extension automatically wraps and unwraps .ar files with JavaScript array syntax on open and save, making it easier to edit these files as if they were native JavaScript arrays.

### Syntax Highlighting
Provides custom syntax highlighting for .ar files, treating contents as JavaScript arrays.

![Syntax Highlighting](images/syntax-highlighting.png)

> Tip: For a better experience, consider using animations to demonstrate the syntax highlighting and wrapping/unwrapping process.

## Requirements

No specific requirements needed for this extension beyond the standard VSCode installation.

## Extension Settings

This extension contributes the following settings:

* `arFileFormat.enable`: Enable/disable automatic wrapping of .ar files.
* `arFileFormat.wrapPrefix`: Customize the prefix used when wrapping .ar files (default is `const array = [`).

## Known Issues

No known issues so far. Please report any issues you find on GitHub to help improve the extension.

## Release Notes

### 1.0.0

Initial release of ar-file-format-support.

* Auto-wrapping and unwrapping of .ar files with JavaScript array syntax.
* Custom syntax highlighting for contents treated as JavaScript arrays.

### 1.0.1

Fixed minor bugs related to syntax highlighting.

### 1.1.0

Added customization options for wrapping prefixes.

---
 

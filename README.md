# ARray File Format

Motivation: Needed something robust for storing quick data and parsing that was faster programatically with added features like JS support (unlike JSON).

- The problem with JSON was that before writing in large files we had to parse and then stringify
- With this file format, we removed the outer brackets of an array and we can append objects/strings/booleans/numbers to the file followed by a comma without having to read the file
- Parsing it is as simple as prepending an array decleration and appending array closing.

## Features

- New file extension `.ar` and `.array`
- Supports comments, JS primitive data types, objects without quotes in prop names
- Has syntax highlighting
- Comes with a formatter

## Extension Settings

This extension contributes the following settings:

- `arrayFile.formatOnSave`: Enable/disable formatting of .ar files on Save.

## Known Issues

- [ ] Template string interpolation does not highlight `${}` brackets, but works with inside it
- [ ] There are no customization settings for prettier at this time

## Release Notes

### 1.0.0

Initial release of ar-file-format-support.

- Custom syntax highlighting for contents treated as JavaScript arrays.
- Formatting ar files

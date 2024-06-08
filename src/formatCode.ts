import * as prettier from 'prettier';

/**
 * Formats the given text by wrapping it within an array declaration, reformatting,
 * and then unwrapping while removing one level of indentation.
 *
 * @param text - The text to format.
 * @returns The formatted text with reduced indentation.
 */
export default async function formatCode(text: string): Promise<string> {
  try {
    // Wrap the input text as an array
    const wrappedArray = `const array = [\n${text}\n];`;
    const formattedWrappedArray = await prettier.format(wrappedArray, {
      parser: 'babel',
      singleQuote: true,
      trailingComma: 'all',
    });

    // Remove the wrapping 'const array = [' at the start
    let formattedArray = formattedWrappedArray.replace(
      /^const array = \[\n/,
      ''
    );

    // Remove the wrapping '];' at the end including any trailing whitespace or newlines
    formattedArray = formattedArray.replace(/\n\s*];\s*$/, '');

    // Split formatted text into lines
    const lines = formattedArray.split('\n');

    // Reduce indentation by one level for each line
    const reducedIndentationArray = lines
      .map((line) => {
        // If the line is not empty, reduce its indentation
        return line.replace(/^ {2}/, ''); // Assumes a 2-space indentation level
      })
      .join('\n');

    return reducedIndentationArray + '\n'; // Add a newline at the end
  } catch (error) {
    console.error('Formatting error:', error);
    return text; // Return original text on error
  }
}

import * as prettier from 'prettier';

/**
 * Formats arrays within the given text.
 *
 * @param text - The text to format.
 * @returns The formatted text.
 */
export default async function formatCode(text: string): Promise<string> {
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

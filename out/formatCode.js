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
const prettier = __importStar(require("prettier"));
/**
 * Formats the given text by wrapping it within an array declaration, reformatting,
 * and then unwrapping while removing one level of indentation.
 *
 * @param text - The text to format.
 * @returns The formatted text with reduced indentation.
 */
function formatCode(text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Wrap the input text as an array
            const wrappedArray = `const array = [\n${text}\n];`;
            const formattedWrappedArray = yield prettier.format(wrappedArray, {
                parser: 'babel',
                singleQuote: true,
                trailingComma: 'all',
            });
            // Remove the wrapping 'const array = [' at the start
            let formattedArray = formattedWrappedArray.replace(/^const array = \[\n/, '');
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
        }
        catch (error) {
            console.error('Formatting error:', error);
            return text; // Return original text on error
        }
    });
}
exports.default = formatCode;
//# sourceMappingURL=formatCode.js.map
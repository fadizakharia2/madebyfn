/**
 * Minimal, dependency-free syntax colouring that matches the design's code
 * cards: keywords in desaturated blue, strings in brass, comments muted,
 * identifiers in the secondary foreground. Output is HTML-escaped.
 */

const KEYWORDS = new Set([
  'async', 'await', 'function', 'return', 'const', 'let', 'var', 'import', 'from', 'export', 'default',
  'if', 'else', 'for', 'while', 'new', 'class', 'extends', 'interface', 'type', 'implements', 'public',
  'private', 'static', 'void', 'using', 'namespace', 'def', 'select', 'from', 'where', 'and', 'or',
  'explain', 'analyze', 'buffers', 'interval', 'null', 'try', 'catch', 'throw', 'switch', 'case',
]);
const LITERALS = new Set(['true', 'false', 'undefined', 'None', 'True', 'False']);

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const TOKEN =
  /(\/\/.*$|#.*$|--.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|(@?[A-Za-z_$][\w$]*)|(\s+)|(.)/gm;

export function highlightCode(code: string): string {
  return code.replace(TOKEN, (match, comment, str, num, ident, ws, other) => {
    if (comment) return `<span class="tok-comment">${escape(comment)}</span>`;
    if (str) return `<span class="tok-string">${escape(str)}</span>`;
    if (num) return `<span class="tok-number">${escape(num)}</span>`;
    if (ident) {
      if (KEYWORDS.has(ident) || KEYWORDS.has(ident.toLowerCase())) return `<span class="tok-keyword">${escape(ident)}</span>`;
      if (LITERALS.has(ident)) return `<span class="tok-literal">${escape(ident)}</span>`;
      return `<span class="tok-ident">${escape(ident)}</span>`;
    }
    if (ws) return ws;
    return escape(other ?? match);
  });
}

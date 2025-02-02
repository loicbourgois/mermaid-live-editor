(self.webpackChunkmermaid_live_editor =
  self.webpackChunkmermaid_live_editor || []).push([
  [2798],
  {
    52798: (e, n, s) => {
      'use strict';
      s.r(n), s.d(n, { conf: () => i, language: () => o });
      var i = {
          comments: { lineComment: '#' },
          brackets: [
            ['{', '}'],
            ['[', ']'],
            ['(', ')'],
          ],
          autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"' },
            { open: "'", close: "'" },
          ],
          surroundingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' },
            { open: '"', close: '"' },
            { open: "'", close: "'" },
          ],
        },
        o = {
          defaultToken: '',
          tokenPostfix: '.ini',
          escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
          tokenizer: {
            root: [
              [/^\[[^\]]*\]/, 'metatag'],
              [/(^\w+)(\s*)(\=)/, ['key', '', 'delimiter']],
              { include: '@whitespace' },
              [/\d+/, 'number'],
              [/"([^"\\]|\\.)*$/, 'string.invalid'],
              [/'([^'\\]|\\.)*$/, 'string.invalid'],
              [/"/, 'string', '@string."'],
              [/'/, 'string', "@string.'"],
            ],
            whitespace: [
              [/[ \t\r\n]+/, ''],
              [/^\s*[#;].*$/, 'comment'],
            ],
            string: [
              [/[^\\"']+/, 'string'],
              [/@escapes/, 'string.escape'],
              [/\\./, 'string.escape.invalid'],
              [
                /["']/,
                {
                  cases: {
                    '$#==$S2': { token: 'string', next: '@pop' },
                    '@default': 'string',
                  },
                },
              ],
            ],
          },
        };
    },
  },
]);

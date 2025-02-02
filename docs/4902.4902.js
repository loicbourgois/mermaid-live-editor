(self.webpackChunkmermaid_live_editor =
  self.webpackChunkmermaid_live_editor || []).push([
  [4902],
  {
    4902: (e, t, a) => {
      'use strict';
      a.r(t), a.d(t, { conf: () => n, language: () => i });
      var n = {
          comments: { blockComment: ['\x3c!--', '--\x3e'] },
          brackets: [['<', '>']],
          autoClosingPairs: [
            { open: '<', close: '>' },
            { open: "'", close: "'" },
            { open: '"', close: '"' },
          ],
          surroundingPairs: [
            { open: '<', close: '>' },
            { open: "'", close: "'" },
            { open: '"', close: '"' },
          ],
        },
        i = {
          defaultToken: '',
          tokenPostfix: '.xml',
          ignoreCase: !0,
          qualifiedName: /(?:[\w\.\-]+:)?[\w\.\-]+/,
          tokenizer: {
            root: [
              [/[^<&]+/, ''],
              { include: '@whitespace' },
              [
                /(<)(@qualifiedName)/,
                [{ token: 'delimiter' }, { token: 'tag', next: '@tag' }],
              ],
              [
                /(<\/)(@qualifiedName)(\s*)(>)/,
                [
                  { token: 'delimiter' },
                  { token: 'tag' },
                  '',
                  { token: 'delimiter' },
                ],
              ],
              [
                /(<\?)(@qualifiedName)/,
                [{ token: 'delimiter' }, { token: 'metatag', next: '@tag' }],
              ],
              [
                /(<\!)(@qualifiedName)/,
                [{ token: 'delimiter' }, { token: 'metatag', next: '@tag' }],
              ],
              [/<\!\[CDATA\[/, { token: 'delimiter.cdata', next: '@cdata' }],
              [/&\w+;/, 'string.escape'],
            ],
            cdata: [
              [/[^\]]+/, ''],
              [/\]\]>/, { token: 'delimiter.cdata', next: '@pop' }],
              [/\]/, ''],
            ],
            tag: [
              [/[ \t\r\n]+/, ''],
              [
                /(@qualifiedName)(\s*=\s*)("[^"]*"|'[^']*')/,
                ['attribute.name', '', 'attribute.value'],
              ],
              [
                /(@qualifiedName)(\s*=\s*)("[^">?\/]*|'[^'>?\/]*)(?=[\?\/]\>)/,
                ['attribute.name', '', 'attribute.value'],
              ],
              [
                /(@qualifiedName)(\s*=\s*)("[^">]*|'[^'>]*)/,
                ['attribute.name', '', 'attribute.value'],
              ],
              [/@qualifiedName/, 'attribute.name'],
              [/\?>/, { token: 'delimiter', next: '@pop' }],
              [
                /(\/)(>)/,
                [{ token: 'tag' }, { token: 'delimiter', next: '@pop' }],
              ],
              [/>/, { token: 'delimiter', next: '@pop' }],
            ],
            whitespace: [
              [/[ \t\r\n]+/, ''],
              [/<!--/, { token: 'comment', next: '@comment' }],
            ],
            comment: [
              [/[^<\-]+/, 'comment.content'],
              [/-->/, { token: 'comment', next: '@pop' }],
              [/<!--/, 'comment.content.invalid'],
              [/[<\-]/, 'comment.content'],
            ],
          },
        };
    },
  },
]);

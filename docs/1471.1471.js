(self.webpackChunkmermaid_live_editor =
  self.webpackChunkmermaid_live_editor || []).push([
  [1471],
  {
    31471: (e, t, n) => {
      'use strict';
      n.r(t), n.d(t, { conf: () => s, language: () => i });
      var s = { comments: { lineComment: '#' } },
        i = {
          defaultToken: 'keyword',
          ignoreCase: !0,
          tokenPostfix: '.azcli',
          str: /[^#\s]/,
          tokenizer: {
            root: [
              { include: '@comment' },
              [
                /\s-+@str*\s*/,
                {
                  cases: {
                    '@eos': { token: 'key.identifier', next: '@popall' },
                    '@default': { token: 'key.identifier', next: '@type' },
                  },
                },
              ],
              [
                /^-+@str*\s*/,
                {
                  cases: {
                    '@eos': { token: 'key.identifier', next: '@popall' },
                    '@default': { token: 'key.identifier', next: '@type' },
                  },
                },
              ],
            ],
            type: [
              { include: '@comment' },
              [
                /-+@str*\s*/,
                {
                  cases: {
                    '@eos': { token: 'key.identifier', next: '@popall' },
                    '@default': 'key.identifier',
                  },
                },
              ],
              [
                /@str+\s*/,
                {
                  cases: {
                    '@eos': { token: 'string', next: '@popall' },
                    '@default': 'string',
                  },
                },
              ],
            ],
            comment: [
              [
                /#.*$/,
                { cases: { '@eos': { token: 'comment', next: '@popall' } } },
              ],
            ],
          },
        };
    },
  },
]);

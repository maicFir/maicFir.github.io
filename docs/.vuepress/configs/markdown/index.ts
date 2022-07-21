import type { MarkdownOptions } from '@vuepress/markdown';
const markdownConfig: MarkdownOptions = {
  anchor: {
    level: [1, 2, 3, 4, 5, 6]
  },
  code: {
    highlightLines: true
  }
};

export default markdownConfig;

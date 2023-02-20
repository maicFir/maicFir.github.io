

const { docsearchPlugin } = require('@vuepress/plugin-docsearch');

const docConfig = {
    apiKey: 'e894d83b211b681a65bf1be5e66e6828',
    appId: 'IUHV80VCR1',
    indexName: 'crawler_learn-wmcweblearn-wmcweb',
    container: '#docsearch-container',
    debug: false,
    locales: {
        '/': {
            placeholder: '请输入Web技术学苑的任何内容，为你快速定位文章位置',
            translations: {
                button: {
                  buttonText: '搜索',
                },
              },
        }
    }
}
export const searchPlugin = function () {
    return docsearchPlugin(docConfig)
}
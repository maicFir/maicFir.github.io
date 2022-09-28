const { docsearchPlugin } = require('@vuepress/plugin-docsearch');

const docConfig = {
    apiKey: '845604cf628213ead071cfd59cd738d8',
    appId: 'L3B9PO3I40',
    indexName: 'learn-wmcweb',
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
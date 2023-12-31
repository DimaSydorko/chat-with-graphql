module.exports = {
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  arrowParens: 'avoid',
  singleQuote: true,
  trailingComma: 'all',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: true,
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true, //;
  tabWidth: 2,
  useTabs: false,
  vueIndentScriptAndStyle: false,
  //-- import --
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrder: [
    '^@nestjs/(.*)$',
    '^@nestjs/graphql(.*)$',
    '^@nestjs(.*)$',
    '^typeorm(.*)$',
    '^firebase/app(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^~config(.*)$',
    '^~utils(.*)$',
    '^~(.*)$',
    '^[./]',
  ],
  // importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

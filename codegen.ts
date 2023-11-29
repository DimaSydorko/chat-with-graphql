import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './*.graphql',
  generates: {
    './src/__generated__/resolvers-types.ts': {
      config: {
        federation: true,
        useIndexSignature: true,
        contextType: '../types/DataSourceContext#DataSourceContext',
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;

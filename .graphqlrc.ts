import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://learn.saleor.cloud/graphql/",
  documents: "graphql/**/*.graphql",
  generates: {
    "gql/": {
      preset: "client",
      plugins: [],
      config: {
        documentMode: 'string',
      },
      presetConfig: {
        fragmentMasking: false
      }
    }
  }
};

export default config;

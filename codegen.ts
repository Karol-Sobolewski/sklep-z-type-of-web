
import type { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clgf9kx7o08o201t36py0f393/master",
//   documents: "graphql/*.graphql",
//   generates: {
//     'generated/': {
//       plugins: [],
//     },
//     "./graphql.schema.json": {
//       plugins: ["introspection"]
//     }
//   }
// };

// export default config;

const config: CodegenConfig = {
  schema: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clgf9kx7o08o201t36py0f393/master',
  documents: ['graphql/*.graphql'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
      './generated/graphql.tsx': {
          // preset: 'client',
          plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      },
  },
  overwrite: true,
};

export default config;
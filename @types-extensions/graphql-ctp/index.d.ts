declare module '*/fetch-product.ctp.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const RetrieveCustomObject: DocumentNode;

  export default defaultDocument;
}

declare module '*.graphql' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

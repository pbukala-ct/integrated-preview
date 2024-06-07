/// <reference path="../../../@types-extensions/graphql-ctp/index.d.ts" />

import type { ApolloError } from '@apollo/client';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import RetrieveProduct from './fetch-product.ctp.graphql';
import RetrieveCategory from './fetch-category.ctp.graphql';
import {
  TCategory,
  TProduct,
  TQuery,
  TQuery_CategoryArgs,
  TQuery_ProductArgs,
} from '../../types/generated/ctp';

type TUseRetrieveProductFetcher = (retrieveProductProps: {
  id?: string;
  key?: string;
  locale: string;
}) => {
  product: TProduct | undefined | null;
  error?: ApolloError;
  loading: boolean;
};

type TQuery_ProductArgsWithLocale = { locale: string } & TQuery_ProductArgs;
export const usePreviewForProduct: TUseRetrieveProductFetcher = ({
  id,
  key,
  locale,
}) => {
  const { data, error, loading } = useMcQuery<
    TQuery,
    TQuery_ProductArgsWithLocale
  >(RetrieveProduct, {
    variables: {
      id: id,
      key: key,
      locale: locale,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    product: data?.product,
    error,
    loading,
  };
};

type TUseRetrieveCategoryFetcher = (retrieveCategoryProps: {
  id?: string;
  key?: string;
  locale: string;
}) => {
  category: TCategory | undefined | null;
  error?: ApolloError;
  loading: boolean;
};

type TQuery_CategoryArgsWithLocale = { locale: string } & TQuery_CategoryArgs;
export const usePreviewForCategory: TUseRetrieveCategoryFetcher = ({
  id,
  key,
  locale,
}) => {
  const { data, error, loading } = useMcQuery<
    TQuery,
    TQuery_CategoryArgsWithLocale
  >(RetrieveCategory, {
    variables: {
      id: id,
      key: key,
      locale: locale,
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });

  return {
    category: data?.category,
    error,
    loading,
  };
};

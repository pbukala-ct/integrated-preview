import { usePreviewForCategory } from '../../../hooks/use-preview-connector';
import { FC } from 'react';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import { getErrorMessage } from '../../../helpers';
import messages from './messages';
import PreviewFrame, {
  AdditionalIFrameConfig,
} from '../preview-frame/preview-frame';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import Spacings from '@commercetools-uikit/spacings';
import { useCustomViewContext } from '@commercetools-frontend/application-shell-connectors';
import { TCategory } from '../../../types/generated/ctp';

export type Props = {
  categoryId: string;
} & AdditionalIFrameConfig;

const buildPath = (category: TCategory, paths: Array<string>) => {
  if (category?.slug) {
    paths.push(category?.slug);
  } else if (category?.name) {
    paths.push(category?.name);
  }
  if (category?.ancestors) {
    buildPath(category.ancestors[0], paths);
  }
};
const CategoryPreview: FC<Props> = ({ categoryId, additionalStyles }) => {
  const { dataLocale, environment } = useCustomViewContext((context) => {
    return {
      dataLocale: context.dataLocale ?? 'en-US',
      environment: context.environment,
    };
  });

  let previewHost = undefined;

  if ('previewHost' in environment) {
    previewHost = environment.previewHost;
  }
  const { category, error, loading } = usePreviewForCategory({
    id: categoryId,
    locale: dataLocale,
  });

  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error)}</Text.Body>
      </ContentNotification>
    );
  }

  if (loading) {
    return (
      <Spacings.Stack alignItems="center">
        <LoadingSpinner />
      </Spacings.Stack>
    );
  }

  if (!loading && !category) {
    return (
      <ContentNotification type="info">
        <Text.Body intlMessage={messages.noResults} />
      </ContentNotification>
    );
  }

  const paths: Array<string> = [];
  buildPath(category!, paths);

  const url = `${previewHost}/${dataLocale.split('-')[0]}/${paths
    .reverse()
    .join('/')}`;
  return <PreviewFrame url={url} additionalStyles={additionalStyles} />;
};
CategoryPreview.displayName = 'ProductPreview';

export default CategoryPreview;

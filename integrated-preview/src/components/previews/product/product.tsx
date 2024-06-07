import { usePreviewForProduct } from '../../../hooks/use-preview-connector';
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

export type Props = {
  productId: string;
  variantId?: string;
} & AdditionalIFrameConfig;
const ProductPreview: FC<Props> = ({
  productId,
  variantId,
  additionalStyles,
}) => {
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
  const { product, error, loading } = usePreviewForProduct({
    id: productId,
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

  if (!loading && !product) {
    return (
      <ContentNotification type="info">
        <Text.Body intlMessage={messages.noResults} />
      </ContentNotification>
    );
  }
  const variant =
    variantId !== undefined
      ? product?.masterData.current?.allVariants.find(
          (value) => value.id === Number(variantId)
        )
      : product?.masterData.current?.masterVariant;

  if (!loading && !variant) {
    return (
      <ContentNotification type="info">
        <Text.Body intlMessage={messages.noResults} />
      </ContentNotification>
    );
  }

  const url = `${previewHost}/${dataLocale.split('-')[0]}/${
    product?.masterData.current?.slug || product?.masterData.current?.name
  }/p/${variant?.sku}/`;
  return <PreviewFrame url={url} additionalStyles={additionalStyles} />;
};
ProductPreview.displayName = 'ProductPreview';

export default ProductPreview;

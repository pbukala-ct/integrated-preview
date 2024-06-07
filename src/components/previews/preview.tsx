import { useCustomViewContext } from '@commercetools-frontend/application-shell-connectors';
import styles from './preview.module.css';
import { InfoMainPage } from '@commercetools-frontend/application-components';
import messages from './messages';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import ProductPreview from './product';
import CategoryPreview from './category';
import ViewSwitcher from '@commercetools-uikit/view-switcher';
import { MobileIcon } from '../../icons/mobile';
import { TabletIcon } from '../../icons/tablet';
import { DesktopIcon } from '../../icons/desktop';
import Spacings from '@commercetools-uikit/spacings';

const Preview = () => {
  const intl = useIntl();
  const { hostUrl } = useCustomViewContext((context) => ({
    hostUrl: context.hostUrl,
  }));

  const [previewType, setPreviewType] = useState<string>('desktop');

  let preview = undefined;
  let productId = undefined;
  let variantId = undefined;
  let categoryId = undefined;

  if (hostUrl) {
    const splittedUrl = hostUrl.split('/');
    const productsIndex = splittedUrl.indexOf('products');
    const variantsIndex = splittedUrl.indexOf('variants');
    const categoriesIndex = splittedUrl.indexOf('categories');

    if (productsIndex >= 0) {
      preview = 'product';
      if (splittedUrl[productsIndex + 1]) {
        productId = splittedUrl[productsIndex + 1];
      }
      if (variantsIndex >= 0) {
        if (splittedUrl[variantsIndex + 1]) {
          variantId = splittedUrl[variantsIndex + 1];
        }
      }
    }
    if (categoriesIndex >= 0) {
      preview = 'category';
      if (splittedUrl[categoriesIndex + 1]) {
        categoryId = splittedUrl[categoriesIndex + 1];
      }
    }
  }
  const config: { [key: string]: { width: number; height?: number } } = {
    mobile: { width: 414, height: 736 },
    tablet: { width: 1024, height: 768 },
    desktop: { width: 1920, height: 1080 },
  };

  if (!preview) {
    return (
      <ContentNotification type="info">
        <Text.Body intlMessage={messages.noPreview} />
      </ContentNotification>
    );
  }

  let toRender = <></>;

  if (preview === 'product') {
    if (!productId) {
      return (
        <ContentNotification type="info">
          <Text.Body intlMessage={messages.noProductId} />
        </ContentNotification>
      );
    } else {
      toRender = (
        <ProductPreview
          productId={productId}
          variantId={variantId}
          additionalStyles={config[previewType]}
        />
      );
    }
  } else if (preview === 'category') {
    if (!categoryId) {
      return (
        <ContentNotification type="info">
          <Text.Body intlMessage={messages.noCategoryId} />
        </ContentNotification>
      );
    } else {
      toRender = (
        <CategoryPreview
          categoryId={categoryId}
          additionalStyles={config[previewType]}
        />
      );
    }
  }

  return (
    <InfoMainPage title={intl.formatMessage(messages.title)}>
      <Spacings.Stack scale={'m'}>
        <ViewSwitcher.Group
          isCondensed
          defaultSelected="desktop"
          onChange={(value) => setPreviewType(value)}
        >
          <ViewSwitcher.Button
            label="Mobile"
            value="mobile"
            icon={<MobileIcon />}
          />
          <ViewSwitcher.Button
            label="Tablet"
            value="tablet"
            icon={<TabletIcon />}
          />
          <ViewSwitcher.Button
            label="Desktop"
            value="desktop"
            icon={<DesktopIcon />}
          />
        </ViewSwitcher.Group>

        <div
          className={styles.mobileFrame}
          style={{ ...(config[previewType] || {}), transform: 'scale(0.5)' }}
        >
          {toRender}
        </div>
      </Spacings.Stack>
    </InfoMainPage>
  );
};
Preview.displayName = 'Preview';

export default Preview;

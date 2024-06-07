/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomView}
 */
const config = {
  name: 'Integrated Preview',
  cloudIdentifier: '${env:CLOUD_IDENTIFIER}',
  env: {
    development: {
      initialProjectKey: '${env:INITIAL_PROJECT_KEY}',
      // hostUriPath: "/tech-sales-good-store/products/436d387a-96ef-47d5-abe1-c5148cdff581/variants/1/images"
      // hostUriPath: "/tech-sales-good-store/products/436d387a-96ef-47d5-abe1-c5148cdff581"
      hostUriPath: "/country-road/products/3cac0764-67b3-484b-a34b-a10ee91b44b4"
    },
    production: {
      customViewId: '${env:CUSTOM_VIEW_ID}',
      url: '${env:APPLICATION_URL}',
    },
  },
  headers: {
    csp: {
      'connect-src': [
        '${env:PREVIEW_HOST}',
      ],
      'frame-src': [
        '${env:PREVIEW_HOST}',
      ],
    }
  },
  additionalEnv: {
    previewHost: 'https://${env:PREVIEW_HOST}',
  },
  oAuthScopes: {
    view: ['view_products'],
    manage: ['manage_products'],
  },
  type: 'CustomPanel',
  typeSettings: {
    size: 'LARGE',
  },
  locators: ['products.product_details.general',
    'products.product_details.variants',
    'products.product_details.search',
    'products.product_details.selections',
    'products.product_variant_details.general',
    'products.product_variant_details.images',
    'products.product_variant_details.prices',
    'products.product_variant_details.inventory',
    'categories.category_details.general',
    'categories.category_details.products',
    'categories.category_details.external_search',
    'categories.category_products.manage_storefront_order',],
};

export default config;

import styles from './preview-frame.module.css';
import { FC } from 'react';

export type AdditionalIFrameConfig = {
  additionalStyles?: { width?: number; height?: number };
};

type Props = { url: string } & AdditionalIFrameConfig;
const PreviewFrame: FC<Props> = ({ url, additionalStyles }) => {
  const additionalStyle: React.CSSProperties = {};
  if (additionalStyles) {
    if (additionalStyles.width) {
      additionalStyle.width = additionalStyles.width - 40;
    }
    if (additionalStyles.height) {
      additionalStyle.height = additionalStyles.height - 40;
    }
  }

  return (
    <iframe
      frameBorder={0}
      loading={'lazy'}
      width={'100%'}
      height={'100%'}
      style={additionalStyle}
      className={styles.previewIframe}
      src={url}
    ></iframe>
  );
};

export default PreviewFrame;

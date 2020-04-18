import React from 'react';
import { Tooltip } from 'antd';
import styles from './index.less';

export interface MiniProgressProps {
  target?: number;
  targetLabel?: string;
  color?: string;
  color1?: string;
  color2?: string;
  color3?: string;

  strokeWidth?: number;
  percent?: number;
  percent1?: number;
  percent2?: number;
  percent3?: number;

  percentLabel?: string;
  percent1Label?: string;
  percent2Label?: string;
  percent3Label?: string;

  style?: React.CSSProperties;
  hideTarget?: boolean;
}

const MiniProgress: React.FC<MiniProgressProps> = ({
  targetLabel,
  target,
  color = 'rgb(19, 194, 194)',
  color1 = 'rgb(19, 194, 194)',
  color2 = 'rgb(19, 194, 194)',
  color3 = 'rgb(245, 245, 245)',

  strokeWidth = 10,
  percent,
  percent1,
  percent2,
  percent3,

  percentLabel,
  percent1Label,
  percent2Label,
  percent3Label,

  hideTarget,
}) => (
  <div className={styles.miniProgress}>
    <Tooltip title={targetLabel}>
      <div
        className={styles.target}
        style={{ visibility: !target ? 'hidden' : 'visible', left: target ? `${target}%` : undefined }}
      >
        <span style={{ backgroundColor: color || undefined }} />
        <span style={{ backgroundColor: color || undefined }} />
      </div>
    </Tooltip>
    <div className={styles.progressWrap}>
      <Tooltip title={percentLabel}>
        <div
          className={styles.progress}
          style={{
            display: 'inline-block',
            backgroundColor: color || undefined,
            width: percent ? `${percent}%` : undefined,
            height: strokeWidth || undefined,
          }}
        />
      </Tooltip>
      <Tooltip title={percent1Label}>
        <div
          className={styles.progress}
          style={{
            display: 'inline-block',
            backgroundColor: color1 || undefined,
            width: percent1 ? `${percent1}%` : undefined,
            height: strokeWidth || undefined,
          }}
        />
      </Tooltip>
      <Tooltip title={percent2Label}>
        <div
          className={styles.progress}
          style={{
            display: 'inline-block',
            backgroundColor: color2 || undefined,
            width: percent2 ? `${percent2}%` : undefined,
            height: strokeWidth || undefined,
          }}
        />
      </Tooltip>
      <Tooltip title={percent3Label}>
        <div
          className={styles.progress}
          style={{
            display: 'inline-block',
            backgroundColor: color3 || undefined,
            width: percent3 ? `${percent3}%` : undefined,
            height: strokeWidth || undefined,
          }}
        />
      </Tooltip>
    </div>
  </div>
);

export default MiniProgress;

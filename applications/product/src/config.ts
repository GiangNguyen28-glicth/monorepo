import { toBool, toInt } from '@giangnt3246/common';

export type ToDateType = null | string | 'now' | 'endOfWeek' | 'endOfMonth';

export class JobWorkerConfig {
  type = '';
  enable = false;
  startFromScratch = false;
  cleanUpOnStart = false;
  concurrent = 1;
  trackingThreshold = 100;
  batchSize = 10;
  retries = 3;
  failedIdleTimeout = 15000;
  toDate?: ToDateType = null;
  dependsOn?: string | string[];

  constructor(props: Partial<JobWorkerConfig> | any) {
    Object.assign(this, {
      ...props,
      enable: true,
      startFromScratch: true,
      cleanUpOnStart: toBool(props.cleanUpOnStart, false),
      batchSize: toInt(props.batchSize, 1),
      concurrent: toInt(props.concurrent, 1),
      trackingThreshold: toInt(props.trackingThreshold, 100),
      retries: toInt(props.retries, 3),
      failedIdleTimeout: toInt(props.failedIdleTimeout, 15000),
    });
  }
}

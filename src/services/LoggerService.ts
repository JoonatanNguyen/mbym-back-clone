import { ContainerInstance } from 'typedi';

import RollbarLoggerService from './RollbarLoggerService';

class LoggerService {
  rollbar: RollbarLoggerService;
  constructor(container: ContainerInstance) {
    this.rollbar = container.get(RollbarLoggerService);
  }

  logError(error: Object) {
    switch (process.env.NODE_ENV) {
      case 'production': {
        this.rollbar.logError(error);
      }

      case 'developement': {
        console.error(error);
      }
    }
  }
}

export default LoggerService;

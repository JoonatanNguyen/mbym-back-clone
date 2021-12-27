import Rollbar from 'rollbar';

class RollbarLoggerService {
  rollbar: any;
  constructor() {
    if (['production', 'uat'].includes(process.env.NODE_ENV as string)) {
      this.rollbar = new Rollbar({
        accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
        captureUncaught: true,
        captureUnhandledRejections: true
      });
    }
  }

  logError(error: Object) {
    this.rollbar.error(error);
  }
}

export default RollbarLoggerService;

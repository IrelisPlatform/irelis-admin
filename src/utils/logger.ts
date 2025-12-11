/**
 * Logger utility pour remplacer console.log
 * Permet de contrôler les logs en production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  enabled: boolean;
  level: LogLevel;
  sendToSentry: boolean;
}

const config: LoggerConfig = {
  enabled: process.env.NODE_ENV === 'development',
  level: 'debug',
  sendToSentry: process.env.NODE_ENV === 'production',
};

const logLevels: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private shouldLog(level: LogLevel): boolean {
    if (!config.enabled && level !== 'error') {
      return false;
    }
    return logLevels[level] >= logLevels[config.level];
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string, error?: Error | any, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(`[ERROR] ${message}`, error, ...args);
    }

    // Envoyer à Sentry en production
    if (config.sendToSentry && error) {
      this.sendToSentry(message, error);
    }
  }

  private sendToSentry(message: string, error: Error | any): void {
    // TODO: Implémenter l'envoi à Sentry
    // Sentry.captureException(error, {
    //   tags: { message },
    // });
  }

  // Méthodes spécialisées pour des cas d'usage courants
  apiError(endpoint: string, error: any): void {
    this.error(`API Error on ${endpoint}`, error);
  }

  formSubmit(formName: string, data: any): void {
    this.debug(`Form submitted: ${formName}`, data);
  }

  userAction(action: string, details?: any): void {
    this.info(`User action: ${action}`, details);
  }

  performance(metric: string, value: number): void {
    this.debug(`Performance: ${metric} = ${value}ms`);
  }
}

export const logger = new Logger();

// Désactiver console.log en production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.debug = () => {};
}

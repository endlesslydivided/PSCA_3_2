const errorMessages = require('./errorMessages');

class AppError extends Error {
    constructor(settings) 
    {
        super();
        settings = (settings || {});
        this.name = 'Application Error';
        this.type = (settings.type || 'Application');
        this.message = (settings.message || errorMessages.SERVER_ERROR);
        this.err = (settings.err || {});
        this.status = (settings.status || 500);
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            stack: this.stack,
            error: (this.err instanceof Error) ? 
            {
                message: this.err.message,
                stack: this.err.stack,
                error: this.err.stack ? this.err.error : this.err
            } : this.err
        };
    }
}

module.exports = AppError;

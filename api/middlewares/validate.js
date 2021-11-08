const { UserFacingError } = require('../utils/error');

module.exports = (validator) => {
    return (req, res, next) => {
        const validatedResult = validator(req.body);
        
        if ('error' in validatedResult) {
            throw new UserFacingError(validatedResult.error.details[0].message)
        }
        next()
    }
}
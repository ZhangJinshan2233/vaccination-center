/**
 * error handler
 */
 class ApplicationError extends Error {
   constructor(message, options = {}) {
     super(message);
 
     // Attach relevant information to the error instance
     // (e.g., the username).
     for (const [key, value] of Object.entries(options)) {
       this[key] = value;
     }
   }
 
   get name() {
     return this.constructor.name
   }
 }
 
 class UserFacingError extends ApplicationError {
   constructor(message, options = {}) {
     super(message, options);
   }
 }
 
 module.exports = {
   UserFacingError
 }
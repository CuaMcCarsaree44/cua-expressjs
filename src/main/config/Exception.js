import process from "process";
import { Log } from "./Logging.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { BaseResponse } from '../model/dto/BaseResponse.js';

/**
 * ErrorHandler
 *  An object to handle Exceptions that 
 *  shown on Api Response.
 */
export class ErrorHandler extends Error {

  /**
   * 
   * @param {string} statusCode 
   * @param {string} message 
   * @param {*} data 
   */
  constructor(statusCode, message, data) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;

    /**
     * You can put your error logger in here.
     */
  }

}

/**
 * This is where error being returned as response.
 */
export const handleError = (res, err) => {
  Log.e("Unhandled Exception", JSON.stringify(err.stack));
  const { statusCode, message, data } = err;

  return BaseResponse.error(
    message,
    res,
    statusCode,
    data
  );
}

/**
 * exception.ts
 *  This file contains the uncaught exception reporting
 *  configuration. How the uncaught exception reporting is
 *  should be react when Run Time Error is thrown.  
 */

export default process.on('uncaughtException', (err, origin) => {
  Log.e(
    "UNCAUGHT EXCEPTION", 
    `Caught exception: ${err}\n`
    + `Exception origin: ${JSON.stringify(origin)}\n\n`,
    path.dirname(fileURLToPath(import.meta.url))
  );
});
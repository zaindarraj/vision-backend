import type { NextFn } from '@adonisjs/core/types/http'

export default class GuestMiddleWare {
  /**
   * The URL to redirect to, when authentication fails
   */
  async handle(
    next: NextFn,
  ) {
    return await next();
  }
}
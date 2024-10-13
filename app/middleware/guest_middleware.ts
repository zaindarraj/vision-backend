// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class GuestMiddleWare {
  /**
   * The URL to redirect to, when authentication fails
   */
  async handle(
    ctx: HttpContext,
    next: NextFn,
  ) {
    return await next();
  }
}
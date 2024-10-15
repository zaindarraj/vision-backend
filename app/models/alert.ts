import { DateTime } from 'luxon'
import { column, BaseModel, hasOne , belongsTo} from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'

export default class Alert extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare imageUrl:string


  @column()
  declare alert: string



  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>


}
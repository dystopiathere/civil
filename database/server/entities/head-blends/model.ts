import { HeadBlends, IHeadBlends } from './types'
import { BaseEntity } from '../base-entity'

export class HeadBlendsModel extends BaseEntity<HeadBlends> implements IHeadBlends {
  constructor () {
    super('head_blends')
  }
}
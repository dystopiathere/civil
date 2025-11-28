import { HeadOverlays, IHeadOverlays } from './types'
import { BaseEntity } from '../base-entity'

export class HeadOverlaysModel extends BaseEntity<HeadOverlays> implements IHeadOverlays {
  constructor () {
    super('head_overlays')
  }
}
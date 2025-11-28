import { ComponentVariations, IComponentVariations } from './types'
import { BaseEntity } from '../base-entity'

export class ComponentVariationsModel extends BaseEntity<ComponentVariations> implements IComponentVariations {
  constructor () {
    super('component_variations')
  }
}
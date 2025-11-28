import { FaceFeatures, IFaceFeatures } from './types'
import { BaseEntity } from '../base-entity'

export class FaceFeaturesModel extends BaseEntity<FaceFeatures> implements IFaceFeatures {
  constructor () {
    super('face_features')
  }
}
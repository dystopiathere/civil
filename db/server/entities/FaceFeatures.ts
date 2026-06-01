import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FaceFeaturesEntity } from "types/civil";

@Entity()
export class FaceFeatures implements FaceFeaturesEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "nose_width", type: "real", default: 1.0 })
  noseWidth: number;

  @Column({ name: "nose_peak", type: "real", default: 1.0 })
  nosePeak: number;

  @Column({ name: "nose_length", type: "real", default: 1.0 })
  noseLength: number;

  @Column({ name: "nose_bone_curveness", type: "real", default: 1.0 })
  noseBoneCurveness: number;

  @Column({ name: "nose_tip", type: "real", default: 1.0 })
  noseTip: number;

  @Column({ name: "nose_bone_twist", type: "real", default: 1.0 })
  noseBoneTwist: number;

  @Column({ name: "eyebrow_up_down", type: "real", default: 1.0 })
  eyebrowUpDown: number;

  @Column({ name: "eyebrow_in_out", type: "real", default: 1.0 })
  eyebrowInOut: number;

  @Column({ name: "cheek_bones", type: "real", default: 1.0 })
  cheekBones: number;

  @Column({ name: "cheek_sideways_bone_size", type: "real", default: 1.0 })
  cheekSidewaysBoneSize: number;

  @Column({ name: "cheek_bones_width", type: "real", default: 1.0 })
  cheekBonesWidth: number;

  @Column({ name: "eye_opening", type: "real", default: 1.0 })
  eyeOpening: number;

  @Column({ name: "lip_thickness", type: "real", default: 1.0 })
  lipThickness: number;

  @Column({ name: "jaw_bone_width", type: "real", default: 1.0 })
  jawBoneWidth: number;

  @Column({ name: "jaw_bone_shape", type: "real", default: 1.0 })
  jawBoneShape: number;

  @Column({ name: "chin_bone", type: "real", default: 1.0 })
  chinBone: number;

  @Column({ name: "chin_bone_length", type: "real", default: 1.0 })
  chinBoneLength: number;

  @Column({ name: "chin_bone_shape", type: "real", default: 1.0 })
  chinBoneShape: number;

  @Column({ name: "chin_hole", type: "real", default: 1.0 })
  chinHole: number;

  @Column({ name: "neck_thickness", type: "real", default: 1.0 })
  neckThickness: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class FaceFeatures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("double")
  nose_width: number = 1.0;

  @Column("double")
  nose_peak: number = 1.0;

  @Column("double")
  nose_length: number = 1.0;

  @Column("double")
  nose_bone_curveness: number = 1.0;

  @Column("double")
  nose_tip: number = 1.0;

  @Column("double")
  nose_bone_twist: number = 1.0;

  @Column("double")
  eyebrow_up_down: number = 1.0;

  @Column("double")
  eyebrow_in_out: number = 1.0;

  @Column("double")
  cheek_bones: number = 1.0;

  @Column("double")
  cheek_sideways_bone_size: number = 1.0;

  @Column("double")
  cheek_bones_width: number = 1.0;

  @Column("double")
  eye_opening: number = 1.0;

  @Column("double")
  lip_thickness: number = 1.0;

  @Column("double")
  jaw_bone_width: number = 1.0;

  @Column("double")
  jaw_bone_shape: number = 1.0;

  @Column("double")
  chin_bone: number = 1.0;

  @Column("double")
  chin_bone_length: number = 1.0;

  @Column("double")
  chin_bone_shape: number = 1.0;

  @Column("double")
  chin_hole: number = 1.0;

  @Column("double")
  neck_thickness: number = 1.0;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

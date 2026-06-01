import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CharacterEntity } from "types/civil";
import { ComponentVariations, FaceFeatures, HeadBlends, HeadOverlays, Player, Skills } from "~/entities";

@Entity()
export class Character implements CharacterEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Player, (player) => player.characters, { lazy: true })
  player: Promise<Player>;

  @Column({ type: "varchar", length: 15, default: "John" })
  @Index({ fulltext: true })
  firstname: string;

  @Column({ type: "varchar", length: 20, default: "Doe" })
  @Index({ fulltext: true })
  lastname: string;

  @Column({ type: "smallint", unsigned: true, default: 18 })
  age: number;

  @Column({ type: "boolean", default: true })
  sex: boolean;

  @Column({ type: "smallint", unsigned: true, default: 500 })
  health: number;

  @Column({ name: "max_health", type: "smallint", unsigned: true, default: 500 })
  maxHealth: number;

  @Column({ type: "smallint", unsigned: true, default: 100 })
  armour: number;

  @Column({ name: "max_armour", type: "smallint", unsigned: true, default: 100 })
  maxArmour: number;

  @Column({ name: "eye_color", type: "smallint", unsigned: true, default: 1 })
  eyeColor: number;

  @Column({ name: "hairFirstColor", type: "smallint", unsigned: true, default: 1 })
  hairFirstColor: number;

  @OneToOne(() => HeadBlends, { cascade: true, eager: true })
  @JoinColumn({ name: "head_blends_id" })
  headBlends: HeadBlends;

  @OneToOne(() => FaceFeatures, { cascade: true, eager: true })
  @JoinColumn({ name: "face_features_id" })
  faceFeatures: FaceFeatures;

  @OneToOne(() => Skills, { cascade: true, eager: true })
  @JoinColumn({ name: "skills_id" })
  skills: Skills;

  @OneToOne(() => ComponentVariations, { cascade: true, eager: true })
  @JoinColumn({ name: "component_variations_id" })
  componentVariations: ComponentVariations;

  @OneToOne(() => HeadOverlays, { cascade: true, eager: true })
  @JoinColumn({ name: "head_overlays_id" })
  headOverlays: HeadOverlays;

  @Column({ name: "last_position", type: "json", nullable: true })
  lastPosition: {
    x: number;
    y: number;
    z: number;
    heading: number;
  };

  @Column({ type: "varchar", length: 255, default: "mp_m_freemode_01" })
  model: string;

  @Column({ type: "boolean", default: false })
  knockdown: boolean;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
  deletedAt: Date;
}

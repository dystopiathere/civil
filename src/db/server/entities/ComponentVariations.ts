import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { ComponentVariationsEntity } from "@civil/types";
import { Character } from "./Character";

@Entity()
export class ComponentVariations implements ComponentVariationsEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToOne(() => Character, (character) => character.componentVariations, { onDelete: "CASCADE" })
  @JoinColumn({ name: "character_id" })
  character: Relation<Character>;

  @Column({ name: "face_drawable", type: "smallint", unsigned: true, default: 0 })
  faceDrawable: number;

  @Column({ name: "face_texture", type: "smallint", unsigned: true, default: 0 })
  faceTexture: number;

  @Column({ name: "face_palette", type: "smallint", unsigned: true, default: 0 })
  facePalette: number;

  @Column({ name: "mask_drawable", type: "smallint", unsigned: true, default: 0 })
  maskDrawable: number;

  @Column({ name: "mask_texture", type: "smallint", unsigned: true, default: 0 })
  maskTexture: number;

  @Column({ name: "mask_palette", type: "smallint", unsigned: true, default: 0 })
  maskPalette: number;

  @Column({ name: "hair_drawable", type: "smallint", unsigned: true, default: 0 })
  hairDrawable: number;

  @Column({ name: "hair_texture", type: "smallint", unsigned: true, default: 0 })
  hairTexture: number;

  @Column({ name: "hair_palette", type: "smallint", unsigned: true, default: 0 })
  hairPalette: number;

  @Column({ name: "torso_drawable", type: "smallint", unsigned: true, default: 0 })
  torsoDrawable: number;

  @Column({ name: "torso_texture", type: "smallint", unsigned: true, default: 0 })
  torsoTexture: number;

  @Column({ name: "torso_palette", type: "smallint", unsigned: true, default: 0 })
  torsoPalette: number;

  @Column({ name: "leg_drawable", type: "smallint", unsigned: true, default: 0 })
  legDrawable: number;

  @Column({ name: "leg_texture", type: "smallint", unsigned: true, default: 0 })
  legTexture: number;

  @Column({ name: "leg_palette", type: "smallint", unsigned: true, default: 0 })
  legPalette: number;

  @Column({ name: "bag_drawable", type: "smallint", unsigned: true, default: 0 })
  bagDrawable: number;

  @Column({ name: "bag_texture", type: "smallint", unsigned: true, default: 0 })
  bagTexture: number;

  @Column({ name: "bag_palette", type: "smallint", unsigned: true, default: 0 })
  bagPalette: number;

  @Column({ name: "shoes_drawable", type: "smallint", unsigned: true, default: 0 })
  shoesDrawable: number;

  @Column({ name: "shoes_texture", type: "smallint", unsigned: true, default: 0 })
  shoesTexture: number;

  @Column({ name: "shoes_palette", type: "smallint", unsigned: true, default: 0 })
  shoesPalette: number;

  @Column({ name: "accessory_drawable", type: "smallint", unsigned: true, default: 0 })
  accessoryDrawable: number;

  @Column({ name: "accessory_texture", type: "smallint", unsigned: true, default: 0 })
  accessoryTexture: number;

  @Column({ name: "accessory_palette", type: "smallint", unsigned: true, default: 0 })
  accessoryPalette: number;

  @Column({ name: "undershirt_drawable", type: "smallint", unsigned: true, default: 0 })
  undershirtDrawable: number;

  @Column({ name: "undershirt_texture", type: "smallint", unsigned: true, default: 0 })
  undershirtTexture: number;

  @Column({ name: "undershirt_palette", type: "smallint", unsigned: true, default: 0 })
  undershirtPalette: number;

  @Column({ name: "kevlar_drawable", type: "smallint", unsigned: true, default: 0 })
  kevlarDrawable: number;

  @Column({ name: "kevlar_texture", type: "smallint", unsigned: true, default: 0 })
  kevlarTexture: number;

  @Column({ name: "kevlar_palette", type: "smallint", unsigned: true, default: 0 })
  kevlarPalette: number;

  @Column({ name: "badge_drawable", type: "smallint", unsigned: true, default: 0 })
  badgeDrawable: number;

  @Column({ name: "badge_texture", type: "smallint", unsigned: true, default: 0 })
  badgeTexture: number;

  @Column({ name: "badge_palette", type: "smallint", unsigned: true, default: 0 })
  badgePalette: number;

  @Column({ name: "torso_second_drawable", type: "smallint", unsigned: true, default: 0 })
  torsoSecondDrawable: number;

  @Column({ name: "torso_second_texture", type: "smallint", unsigned: true, default: 0 })
  torsoSecondTexture: number;

  @Column({ name: "torso_second_palette", type: "smallint", unsigned: true, default: 0 })
  torsoSecondPalette: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}

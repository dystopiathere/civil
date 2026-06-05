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

  @Column({ name: "face_collection", type: "varchar", unsigned: true, default: "" })
  faceCollection: string;

  @Column({ name: "face_drawable", type: "smallint", unsigned: true, default: 0 })
  faceDrawable: number;

  @Column({ name: "face_texture", type: "smallint", unsigned: true, default: 0 })
  faceTexture: number;

  @Column({ name: "mask_collection", type: "varchar", unsigned: true, default: "" })
  maskCollection: string;

  @Column({ name: "mask_drawable", type: "smallint", unsigned: true, default: 0 })
  maskDrawable: number;

  @Column({ name: "mask_texture", type: "smallint", unsigned: true, default: 0 })
  maskTexture: number;

  @Column({ name: "hair_collection", type: "varchar", unsigned: true, default: "" })
  hairCollection: string;

  @Column({ name: "hair_drawable", type: "smallint", unsigned: true, default: 0 })
  hairDrawable: number;

  @Column({ name: "hair_texture", type: "smallint", unsigned: true, default: 0 })
  hairTexture: number;

  @Column({ name: "torso_collection", type: "varchar", unsigned: true, default: "" })
  torsoCollection: string;

  @Column({ name: "torso_drawable", type: "smallint", unsigned: true, default: 0 })
  torsoDrawable: number;

  @Column({ name: "torso_texture", type: "smallint", unsigned: true, default: 0 })
  torsoTexture: number;

  @Column({ name: "leg_collection", type: "varchar", unsigned: true, default: "" })
  legCollection: string;

  @Column({ name: "leg_drawable", type: "smallint", unsigned: true, default: 0 })
  legDrawable: number;

  @Column({ name: "leg_texture", type: "smallint", unsigned: true, default: 0 })
  legTexture: number;

  @Column({ name: "bag_collection", type: "varchar", unsigned: true, default: "" })
  bagCollection: string;

  @Column({ name: "bag_drawable", type: "smallint", unsigned: true, default: 0 })
  bagDrawable: number;

  @Column({ name: "bag_texture", type: "smallint", unsigned: true, default: 0 })
  bagTexture: number;

  @Column({ name: "shoes_collection", type: "varchar", unsigned: true, default: "" })
  shoesCollection: string;

  @Column({ name: "shoes_drawable", type: "smallint", unsigned: true, default: 0 })
  shoesDrawable: number;

  @Column({ name: "shoes_texture", type: "smallint", unsigned: true, default: 0 })
  shoesTexture: number;

  @Column({ name: "accessory_collection", type: "varchar", unsigned: true, default: "" })
  accessoryCollection: string;

  @Column({ name: "accessory_drawable", type: "smallint", unsigned: true, default: 0 })
  accessoryDrawable: number;

  @Column({ name: "accessory_texture", type: "smallint", unsigned: true, default: 0 })
  accessoryTexture: number;

  @Column({ name: "undershirt_collection", type: "varchar", unsigned: true, default: "" })
  undershirtCollection: string;

  @Column({ name: "undershirt_drawable", type: "smallint", unsigned: true, default: 0 })
  undershirtDrawable: number;

  @Column({ name: "undershirt_texture", type: "smallint", unsigned: true, default: 0 })
  undershirtTexture: number;

  @Column({ name: "kevlar_collection", type: "varchar", unsigned: true, default: "" })
  kevlarCollection: string;

  @Column({ name: "kevlar_drawable", type: "smallint", unsigned: true, default: 0 })
  kevlarDrawable: number;

  @Column({ name: "kevlar_texture", type: "smallint", unsigned: true, default: 0 })
  kevlarTexture: number;

  @Column({ name: "badge_collection", type: "varchar", unsigned: true, default: "" })
  badgeCollection: string;

  @Column({ name: "badge_drawable", type: "smallint", unsigned: true, default: 0 })
  badgeDrawable: number;

  @Column({ name: "badge_texture", type: "smallint", unsigned: true, default: 0 })
  badgeTexture: number;

  @Column({ name: "torso_second_collection", type: "varchar", unsigned: true, default: "" })
  torsoSecondCollection: string;

  @Column({ name: "torso_second_drawable", type: "smallint", unsigned: true, default: 0 })
  torsoSecondDrawable: number;

  @Column({ name: "torso_second_texture", type: "smallint", unsigned: true, default: 0 })
  torsoSecondTexture: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}

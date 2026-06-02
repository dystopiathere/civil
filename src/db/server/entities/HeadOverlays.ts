import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { HeadOverlaysEntity } from "@civil/types";

@Entity()
export class HeadOverlays implements HeadOverlaysEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  blemishes: number;

  @Column({ name: "blemishes_opacity", type: "real", default: 0.0 })
  blemishesOpacity: number;

  @Column({ name: "facial_hair", type: "smallint", unsigned: true, default: 0 })
  facialHair: number;

  @Column({ name: "facial_hair_color", type: "smallint", unsigned: true, default: 0 })
  facialHairColor: number;

  @Column({ name: "facial_hair_second_color", type: "smallint", unsigned: true, default: 0 })
  facialHairSecondColor: number;

  @Column({ name: "facial_hair_opacity", type: "real", default: 0.0 })
  facialHairOpacity: number;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  eyebrows: number;

  @Column({ name: "eyebrows_color", type: "smallint", unsigned: true, default: 0 })
  eyebrowsColor: number;

  @Column({ name: "eyebrows_second_color", type: "smallint", unsigned: true, default: 0 })
  eyebrowsSecondColor: number;

  @Column({ name: "eyebrows_opacity", type: "real", default: 0.0 })
  eyebrowsOpacity: number;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  ageing: number;

  @Column({ name: "ageing_opacity", type: "real", default: 0.0 })
  ageingOpacity: number;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  makeup: number;

  @Column({ name: "makeup_color", type: "smallint", unsigned: true, default: 0 })
  makeupColor: number;

  @Column({ name: "makeup_second_color", type: "smallint", unsigned: true, default: 0 })
  makeupSecondColor: number;

  @Column({ name: "makeup_opacity", type: "real", default: 0.0 })
  makeupOpacity: number;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  blush: number;

  @Column({ name: "blush_color", type: "smallint", unsigned: true, default: 0 })
  blushColor: number;

  @Column({ name: "blush_second_color", type: "smallint", unsigned: true, default: 0 })
  blushSecondColor: number;

  @Column({ name: "blush_opacity", type: "real", default: 0.0 })
  blushOpacity: number;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  complexion: number;

  @Column({ name: "complexion_opacity", type: "real", default: 0.0 })
  complexionOpacity: number;

  @Column({ name: "sun_damage", type: "smallint", unsigned: true, default: 0 })
  sunDamage: number;

  @Column({ name: "sun_damage_opacity", type: "real", default: 0.0 })
  sunDamageOpacity: number;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  lipstick: number;

  @Column({ name: "lipstick_color", type: "smallint", unsigned: true, default: 0 })
  lipstickColor: number;

  @Column({ name: "lipstick_second_color", type: "smallint", unsigned: true, default: 0 })
  lipstickSecondColor: number;

  @Column({ name: "lipstick_opacity", type: "real", default: 0.0 })
  lipstickOpacity: number;

  @Column({ name: "moles_freckles", type: "smallint", unsigned: true, default: 0 })
  molesFreckles: number;

  @Column({ name: "moles_freckles_color", type: "smallint", unsigned: true, default: 0 })
  molesFrecklesColor: number;

  @Column({ name: "moles_freckles_second_color", type: "smallint", unsigned: true, default: 0 })
  molesFrecklesSecondColor: number;

  @Column({ name: "moles_freckles_opacity", type: "real", default: 0.0 })
  molesFrecklesOpacity: number;

  @Column({ name: "chest_hair", type: "smallint", unsigned: true, default: 0 })
  chestHair: number;

  @Column({ name: "chest_hair_color", type: "smallint", unsigned: true, default: 0 })
  chestHairColor: number;

  @Column({ name: "chest_hair_second_color", type: "smallint", unsigned: true, default: 0 })
  chestHairSecondColor: number;

  @Column({ name: "chest_hair_opacity", type: "real", default: 0.0 })
  chestHairOpacity: number;

  @Column({ name: "body_blemishes", type: "smallint", unsigned: true, default: 0 })
  bodyBlemishes: number;

  @Column({ name: "body_blemishes_opacity", type: "real", default: 0.0 })
  bodyBlemishesOpacity: number;

  @Column({ name: "add_body_blemishes", type: "smallint", unsigned: true, default: 0 })
  addBodyBlemishes: number;

  @Column({ name: "add_body_blemishes_opacity", type: "real", default: 0.0 })
  addBodyBlemishesOpacity: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}

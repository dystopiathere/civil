import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class HeadOverlays {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blemishes: number = 0;

  @Column("double")
  blemishes_opacity: number = 0.0;

  @Column()
  facial_hair: number = 0;

  @Column()
  facial_hair_color: number = 0;

  @Column()
  facial_hair_second_color: number = 0;

  @Column("double")
  facial_hair_opacity: number = 0.0;

  @Column()
  eyebrows: number = 0;

  @Column()
  eyebrows_color: number = 0;

  @Column()
  eyebrows_second_color: number = 0;

  @Column("double")
  eyebrows_opacity: number = 0.0;

  @Column()
  ageing: number = 0;

  @Column("double")
  ageing_opacity: number = 0.0;

  @Column()
  makeup: number = 0;

  @Column()
  makeup_color: number = 0;

  @Column()
  makeup_second_color: number = 0;

  @Column("double")
  makeup_opacity: number = 0.0;

  @Column()
  blush: number = 0;

  @Column()
  blush_color: number = 0;

  @Column()
  blush_second_color: number = 0;

  @Column("double")
  blush_opacity: number = 0.0;

  @Column()
  complexion: number = 0;

  @Column("double")
  complexion_opacity: number = 0.0;

  @Column()
  sun_damage: number = 0;

  @Column("double")
  sun_damage_opacity: number = 0.0;

  @Column()
  lipstick: number = 0;

  @Column()
  lipstick_color: number = 0;

  @Column()
  lipstick_second_color: number = 0;

  @Column("double")
  lipstick_opacity: number = 0.0;

  @Column()
  moles_freckles: number = 0;

  @Column()
  moles_freckles_color: number = 0;

  @Column()
  moles_freckles_second_color: number = 0;

  @Column("double")
  moles_freckles_opacity: number = 0.0;

  @Column()
  chest_hair: number = 0;

  @Column()
  chest_hair_color: number = 0;

  @Column()
  chest_hair_second_color: number = 0;

  @Column("double")
  chest_hair_opacity: number = 0.0;

  @Column()
  body_blemishes: number = 0;

  @Column("double")
  body_blemishes_opacity: number = 0.0;

  @Column()
  add_body_blemishes: number = 0;

  @Column("double")
  add_body_blemishes_opacity: number = 0.0;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

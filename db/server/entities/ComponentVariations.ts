import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ComponentVariations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  face_drawable: number = 0;

  @Column()
  face_texture: number = 0;

  @Column()
  face_palette: number = 0;

  @Column()
  mask_drawable: number = 0;

  @Column()
  mask_texture: number = 0;

  @Column()
  mask_palette: number = 0;

  @Column()
  hair_drawable: number = 0;

  @Column()
  hair_texture: number = 0;

  @Column()
  hair_palette: number = 0;

  @Column()
  torso_drawable: number = 0;

  @Column()
  torso_texture: number = 0;

  @Column()
  torso_palette: number = 0;

  @Column()
  leg_drawable: number = 0;

  @Column()
  leg_texture: number = 0;

  @Column()
  leg_palette: number = 0;

  @Column()
  bag_drawable: number = 0;

  @Column()
  bag_texture: number = 0;

  @Column()
  bag_palette: number = 0;

  @Column()
  shoes_drawable: number = 0;

  @Column()
  shoes_texture: number = 0;

  @Column()
  shoes_palette: number = 0;

  @Column()
  accessory_drawable: number = 0;

  @Column()
  accessory_texture: number = 0;

  @Column()
  accessory_palette: number = 0;

  @Column()
  undershirt_drawable: number = 0;

  @Column()
  undershirt_texture: number = 0;

  @Column()
  undershirt_palette: number = 0;

  @Column()
  kevlar_drawable: number = 0;

  @Column()
  kevlar_texture: number = 0;

  @Column()
  kevlar_palette: number = 0;

  @Column()
  badge_drawable: number = 0;

  @Column()
  badge_texture: number = 0;

  @Column()
  badge_palette: number = 0;

  @Column()
  torso_second_drawable: number = 0;

  @Column()
  torso_second_texture: number = 0;

  @Column()
  torso_second_palette: number = 0;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

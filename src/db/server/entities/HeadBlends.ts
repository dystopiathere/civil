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
import { HeadBlendsEntity } from "@civil/types";
import { Character } from "./Character";

@Entity()
export class HeadBlends implements HeadBlendsEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToOne(() => Character, (character) => character.headBlends, { onDelete: "CASCADE" })
  @JoinColumn({ name: "character_id" })
  character: Relation<Character>;

  @Column({ name: "shape_first_id", type: "smallint", unsigned: true, default: 1 })
  shapeFirstId: number;

  @Column({ name: "shape_second_id", type: "smallint", unsigned: true, default: 1 })
  shapeSecondId: number;

  @Column({ name: "shape_third_id", type: "smallint", unsigned: true, default: 1 })
  shapeThirdId: number;

  @Column({ name: "skin_first_id", type: "smallint", unsigned: true, default: 1 })
  skinFirstId: number;

  @Column({ name: "skin_second_id", type: "smallint", unsigned: true, default: 1 })
  skinSecondId: number;

  @Column({ name: "skin_third_id", type: "smallint", unsigned: true, default: 1 })
  skinThirdId: number;

  @Column({ name: "shape_mix", type: "real", default: 1.0 })
  shapeMix: number;

  @Column({ name: "skin_mix", type: "real", default: 1.0 })
  skinMix: number;

  @Column({ name: "third_mix", type: "real", default: 1.0 })
  thirdMix: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}

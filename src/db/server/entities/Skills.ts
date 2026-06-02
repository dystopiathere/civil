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
import { SkillsEntity } from "@civil/types";
import { Character } from "./Character";

@Entity()
export class Skills implements SkillsEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToOne(() => Character, (character) => character.skills, { onDelete: "CASCADE" })
  @JoinColumn({ name: "character_id" })
  character: Relation<Character>;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  stamina: number;

  @Column({ type: "smallint", unsigned: true, default: 0 })
  strength: number;

  @Column({ name: "lung_capacity", type: "smallint", unsigned: true, default: 0 })
  lungCapacity: number;

  @Column({ name: "wheelie_ability", type: "smallint", unsigned: true, default: 0 })
  wheelieAbility: number;

  @Column({ name: "flying_ability", type: "smallint", unsigned: true, default: 0 })
  flyingAbility: number;

  @Column({ name: "shooting_ability", type: "smallint", unsigned: true, default: 0 })
  shootingAbility: number;

  @Column({ name: "stealth_ability", type: "smallint", unsigned: true, default: 0 })
  stealthAbility: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}

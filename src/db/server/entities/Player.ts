import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { PlayerEntity } from "@civil/types";
import { Character, Connection } from "~/entities";

@Entity()
export class Player implements PlayerEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 255 })
  @Index({ unique: true })
  steam: string;

  @Column({ type: "varchar", length: 255 })
  @Index({ unique: true })
  discord: string;

  @Column({ type: "varchar", length: 255 })
  @Index({ unique: true })
  license: string;

  @Column({ type: "boolean", default: false })
  whitelisted: boolean;

  @Column({ type: "boolean", default: false })
  banned: boolean;

  @Column({ name: "ban_reason", type: "varchar", length: 255, nullable: true })
  banReason: string;

  @OneToMany(() => Character, (character) => character.player, { cascade: true, eager: true })
  characters: Relation<Character>[];

  @OneToMany(() => Connection, (connection) => connection.player, { cascade: true, eager: true })
  connections: Relation<Connection>[];

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;
}

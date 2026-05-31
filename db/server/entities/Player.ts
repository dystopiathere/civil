import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Character } from "./Character";
import { Connection } from "./Connection";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  steam: string;

  @Column()
  @Index({ unique: true })
  discord: string;

  @Column()
  @Index({ unique: true })
  license: string;

  @Column()
  whitelisted: boolean = false;

  @Column()
  banned: boolean = false;

  @Column({ nullable: true })
  ban_reason: string;

  @OneToMany(() => Character, (character) => character.player, { cascade: true, lazy: true })
  characters: Promise<Character[]>;

  @OneToMany(() => Connection, (connection) => connection.player, { cascade: true, lazy: true })
  connections: Promise<Connection[]>;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

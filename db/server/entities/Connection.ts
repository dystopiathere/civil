import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";

@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.connections, { cascade: true, lazy: true })
  player: Promise<Player>;

  @Column()
  identifiers: Record<string, string | number>;

  @CreateDateColumn()
  created_at: string;
}

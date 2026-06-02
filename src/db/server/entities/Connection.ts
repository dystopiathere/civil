import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConnectionEntity } from "@civil/types";
import { Player } from "~/entities";

@Entity()
export class Connection implements ConnectionEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Player, (player) => player.connections, { lazy: true, onDelete: "CASCADE" })
  player: Promise<Player>;

  @Column({ type: "json" })
  identifiers: Record<string, string | number>;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;
}

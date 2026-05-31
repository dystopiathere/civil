import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Skills {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stamina: number = 0;

  @Column()
  strength: number = 0;

  @Column()
  lung_capacity: number = 0;

  @Column()
  wheelie_ability: number = 0;

  @Column()
  flying_ability: number = 0;

  @Column()
  shooting_ability: number = 0;

  @Column()
  stealth_ability: number = 0;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

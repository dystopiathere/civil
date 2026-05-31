import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class HeadBlends {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shape_first_id: number = 1;

  @Column()
  shape_second_id: number = 1;

  @Column()
  shape_third_id: number = 1;

  @Column()
  skin_first_id: number = 1;

  @Column()
  skin_second_id: number = 1;

  @Column()
  skin_third_id: number = 1;

  @Column("double")
  shape_mix: number = 1.0;

  @Column("double")
  skin_mix: number = 1.0;

  @Column("double")
  third_mix: number = 1.0;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { HeadBlends } from "./HeadBlends";
import { FaceFeatures } from "./FaceFeatures";
import { Skills } from "./Skills";
import { ComponentVariations } from "./ComponentVariations";
import { HeadOverlays } from "./HeadOverlays";
import { Player } from "./Player";

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.characters, { cascade: true, lazy: true })
  player: Promise<Player>;

  @Column({ length: 15 })
  @Index({ fulltext: true })
  firstname: string = "John";

  @Column({ length: 20 })
  @Index({ fulltext: true })
  lastname: string = "Doe";

  @Column()
  age: number = 18;

  @Column()
  sex: boolean = true;

  @Column()
  health: number = 500;

  @Column()
  max_health: number = 500;

  @Column()
  armour: number = 100;

  @Column()
  max_armour: number = 100;

  @Column()
  eye_color: number = 1;

  @Column()
  hair_first_color: number = 1;

  @OneToOne(() => HeadBlends, { cascade: true, eager: true })
  @JoinColumn()
  head_blends: HeadBlends;

  @OneToOne(() => FaceFeatures, { cascade: true, eager: true })
  @JoinColumn()
  face_features: FaceFeatures;

  @OneToOne(() => Skills, { cascade: true, eager: true })
  @JoinColumn()
  skills: Skills;

  @OneToOne(() => ComponentVariations, { cascade: true, eager: true })
  @JoinColumn()
  component_variations: ComponentVariations;

  @OneToOne(() => HeadOverlays, { cascade: true, eager: true })
  @JoinColumn()
  head_overlays: HeadOverlays;

  @Column({ nullable: true })
  last_position: {
    x: number;
    y: number;
    z: number;
    heading: number;
  };

  @Column()
  model: string = "mp_m_freemode_01";

  @Column()
  knockdown: boolean = false;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @DeleteDateColumn()
  deleted_at: string;
}

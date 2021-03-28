import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Patient from "./Patient";

@Entity("diaries")
class Diary {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("timestamp")
  date: Date;

  @Column("integer")
  walk: number;

  @Column("time")
  sleep: string;

  @Column()
  patient_id: string;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: "patient_id" })
  patient: Patient;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Diary;

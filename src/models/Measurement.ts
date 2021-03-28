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

@Entity("measurements")
class Measurement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("float")
  temperature: number;

  @Column("integer")
  heart_rate: number;

  @Column("integer")
  arterial_frequency_min: number;

  @Column("integer")
  arterial_frequency_max: number;

  @Column("integer")
  blood_saturation: number;

  @Column("timestamp without time zone")
  time: Date;

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

export default Measurement;

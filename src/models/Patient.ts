import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('patients')
class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  phone: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  pathology: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  born_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Patient;

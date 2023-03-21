import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { PersonalDataEntity } from './personal-data.entity';

enum RolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity('tb_users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  password: string;

  @Column()
  policies: boolean;

  @Column({ nullable: true })
  ip: string;

  @Column({
    type: 'enum',
    enum: ['ADMIN', 'USER'],
    default: RolesEnum.USER,
  })
  type: string;

  @OneToOne(() => PersonalDataEntity)
  @JoinColumn()
  personal_data: PersonalDataEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ update: true })
  updated_at: Date;

  @Column({ default: false })
  mailconfirm: boolean;

  @Column({ nullable: true })
  recoverPasswordToken?: string;

  constructor(user?: Partial<UsersEntity>) {
    this.id = user?.id;
    this.name = user?.name;
    this.email = user?.email;
    this.cpf = user?.cpf;
    this.password = user?.password;
    this.type = user?.type;
    this.mailconfirm = user?.mailconfirm;
    this.recoverPasswordToken = user?.recoverPasswordToken;
    this.created_at = user?.created_at;
    this.updated_at = user?.updated_at;
  }
}

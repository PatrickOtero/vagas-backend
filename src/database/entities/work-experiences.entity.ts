import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PersonalDataEntity } from './personal-data.entity';

@Entity('work_experiences')
export class WorkExperienceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  institution: string;

  @Column({ default: false })
  actual_job: boolean;

  @Column()
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => PersonalDataEntity)
  @JoinColumn({ name: 'personal_data_id' })
  personal_data: PersonalDataEntity;

  @Column()
  personal_data_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

  constructor(workExperience?: Partial<WorkExperienceEntity>) {
    this.id = workExperience?.id;
    this.name = workExperience?.name;
    this.institution = workExperience?.institution;
    this.actual_job = workExperience?.actual_job;
    this.start_date = workExperience?.start_date;
    this.end_date = workExperience?.end_date;
    this.description = workExperience?.description;
    this.personal_data_id = workExperience?.personal_data_id;
    this.created_at = workExperience?.created_at;
    this.updated_at = workExperience?.updated_at;
  }
}

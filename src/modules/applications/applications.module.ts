import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationsRepository } from './repository/applications.repository';
import { ApplicationEntity } from 'src/database/entities/applications.entity';
import { PassportModule } from '@nestjs/passport';
import { JobsEntity } from 'src/database/entities/jobs.entity';
import { UsersEntity } from 'src/database/entities/users.entity';
import { JobRepository } from '../jobs/repository/job.repository';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationEntity, JobsEntity, UsersEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsRepository, ApplicationsService, JobRepository, UserRepository],
})
export class ApplicationsModule {}

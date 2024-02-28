import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../../database/entities/users.entity';
import { ApplicationsRepository } from './repository/applications.repository';
import { JobRepository } from '../jobs/repository/job.repository';
import { UserRepository } from '../user/repository/user.repository';
import { IApplicationsResponse } from './interfaces/interfaces';

@Injectable()
export class ApplicationsService {
  constructor(
    private applicationsRepository: ApplicationsRepository,
    private jobsRepository: JobRepository,
    private userRepository: UserRepository
    ) {}

  async saveApplication(
    user: UsersEntity,
    jobId: string,
    curriculumId: string,
  ) {
    const newApplication = {
      job_id: jobId,
      user_id: user.id,
      curriculum_id: curriculumId,
    };

    return this.applicationsRepository.saveApplication(newApplication);
  }

  async listJobApplications(jobId: string): Promise<IApplicationsResponse> {
    const jobExists = await this.jobsRepository.findOneById(jobId)

    if (!jobExists) {
      return {
        status: 404,
        data: {
          message: "Job not found"
        }
      }
    }
    
    const userNames = await this.applicationsRepository.listApplicationsUsersName(jobId)

    if (!userNames.length) {
      return {
        status: 400,
        data: {
          message: "There are no applications for this job"
        }
      } 
    }

    return {
      status: 200,
      data: {
        message: "Applications user names listed succesfully",
        content: userNames
      }
    }

  }
}

import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersEntity } from '../../database/entities/users.entity';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { ApplicationsService } from './applications.service';
import { Response } from 'express';

@ApiTags('Applications')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get()
  async saveApplication(
    @Query("jobId") jobId: string,
    @Query("curriculumId") curriculumId: string,
    @LoggedUser() user: UsersEntity,
  ) {
    return this.applicationsService.saveApplication(user, jobId, curriculumId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("listUserNames")
  async listJobApplications(
    @Query("jobId") jobId: string,
    @Res() res: Response
  ) {
    const {status, data } = await this.applicationsService.listJobApplications(jobId);

    return res.status(status).json(data)
  }
}

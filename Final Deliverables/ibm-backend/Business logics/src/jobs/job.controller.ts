import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { JobService } from './job.service';
import {
  JobDto,
  UpdateJobDto,
  CategoryJobDto,
  AddCandidateDto,
} from './dto/job.dto';
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @Get('/getalljobs')
  getalljobs() {
    return this.jobService.getAllJobs();
  }

  @Get('/jobs-count')
  getJobsCount(@Query('id') _id: string) {
    return this.jobService.getTotalJobs(_id);
  }

  @Get('/getJobByCategory')
  getJobByCategory(@Query() params: CategoryJobDto) {
    return this.jobService.getJobByCategory(params);
  }

  @Get('/filter-company')
  getJobByCompany(@Query('id') params: string) {
    return this.jobService.getJobByCompany(params);
  }
  @Get('/getJobById')
  getJobById(@Query('id') params: string) {
    return this.jobService.getJobsById(params);
  }

  @Get('/getJobByIdStats')
  getJobByIdStats(@Query('id') params: string) {
    return this.jobService.getJobByIdForStats(params);
  }

  @Get('/filter')
  getJobByFilter(@Query() params: any) {
    return this.jobService.filter(params.name, params.location);
  }

  @Post('/createJob')
  createJob(@Body() data: JobDto) {
    return this.jobService.createJob(data);
  }

  @Put('/updateJob')
  updateJob(@Body() data: UpdateJobDto) {
    return this.jobService.updateJob(data);
  }

  @Put('/add-candidate')
  addCandidatate(@Body() data: AddCandidateDto) {
    return this.jobService.addCandidate(data);
  }
}

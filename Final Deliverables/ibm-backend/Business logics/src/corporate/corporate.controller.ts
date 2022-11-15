import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { verifyRequest } from 'src/utils/auth.utils';
import { CorporateService } from './corporate.service';
import {
  createCorporateDto,
  LoginDto,
  SignupDto,
  UpdateDto,
} from './dto/corporate.dto';
import { ICorporate } from './interfaces/corporate.interface';

@Controller('corporate')
export class CorporateController {
  constructor(
    private readonly service: CorporateService,
    @InjectModel('Corporate')
    private readonly corporateModel: Model<ICorporate>,
  ) {}

  @Get('/is-logged')
  isLogged(@Req() request: Request) {
    return this.service.isLoggedIn(request);
  }

  @Post('/signup')
  Signup(@Body() data: SignupDto) {
    return this.service.SignUp(data);
  }

  @Put('/profile-update')
  async ProfileUpdate(@Req() request: Request, @Body() data: UpdateDto) {
    const isAuthorized: boolean = await verifyRequest(
      request,
      this.corporateModel,
    );
    if (isAuthorized) return this.service.profileUpdate(data);
  }

  @Get('/login')
  Login(@Query() params: LoginDto) {
    return this.service.login(params);
  }

  @Put('/update')
  async update(@Req() request: Request, @Body() data: createCorporateDto) {
    const isAuthorized: boolean = await verifyRequest(
      request,
      this.corporateModel,
    );
    if (isAuthorized) return this.service.update(data);
  }
}

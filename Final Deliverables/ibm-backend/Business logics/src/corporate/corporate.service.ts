import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { generateToken } from 'src/utils/auth.utils';
import { decode } from 'src/utils/decoding.utils';
import { hashPassword, verifyPassword } from 'src/utils/hashing';
import {
  ICorporate,
  ILogin,
  ISignup,
  IUpdate,
} from './interfaces/corporate.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CorporateService {
  constructor(
    @InjectModel('Corporate')
    private readonly corporateModel: Model<ICorporate>,
  ) {}

  async SignUp(data: ISignup) {
    const { password, ...rest } = data;
    const decodedPassword = decode(password);
    const hashedPassword = hashPassword(decodedPassword);
    const userData = { ...rest, password: hashedPassword };
    const newUser = new this.corporateModel(userData);
    await newUser.save();
    const token = generateToken(rest.email);
    const user = await this.corporateModel
      .findOne({ email: rest.email })
      .select('-password')
      .exec();
    return {
      success: true,
      token: token,
      data: user,
    };
  }

  async login(data: ILogin) {
    const isVerified = await verifyPassword(
      data.email,
      data.password,
      this.corporateModel,
    );
    if (isVerified) {
      const token = generateToken(data.email);
      const user = await this.corporateModel
        .findOne({ email: data.email })
        .select('-password')
        .exec();
      return {
        success: true,
        token: token,
        data: user,
      };
    } else {
      throw new ForbiddenException();
    }
  }

  async update(data: ICorporate) {
    const { email, ...rest } = data;
    const dataToUpdated = { ...rest, is_steps_completed: true };
    const res = await this.corporateModel
      .findOneAndUpdate({ email: email }, dataToUpdated, { new: true })
      .select('-password');
    if (res === null) throw new NotFoundException();
    else {
      return res;
    }
  }

  async isLoggedIn(request: Request) {
    const auth = request.headers['authorization'];
    if (auth) {
      if (auth === 'Bearer null') {
      } else {
        const token = auth.split(' ')[1];
        try {
          const decoded = jwt.verify(token, 'ajhasdhfjdafglkasfbsdjfd');
          const user = await this.corporateModel
            .findOne({ email: decoded.email })
            .select('-password')
            .exec();
          if (user != null) {
            return user;
          } else throw new NotFoundException();
        } catch (err) {
          throw new UnauthorizedException();
        }
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  async profileUpdate(data: IUpdate) {
    const { _id, ...rest } = data;
    const res = await this.corporateModel.findOneAndUpdate({ _id: _id }, rest);
    if (res == null) {
      throw new NotFoundException();
    }
    return {
      success: true,
    };
  }
}

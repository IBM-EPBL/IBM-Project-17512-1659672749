import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';

export const verifyRequest = async (
  request: Request,
  model: Model<any>,
): Promise<boolean> => {
  const auth = request.headers['authorization'];
  if (auth) {
    if (auth === 'Bearer null') {
    } else {
      const token = auth.split(' ')[1];
      try {
        const decoded = jwt.verify(token, 'ajhasdhfjdafglkasfbsdjfd');
        const user = await model.findOne({ email: decoded.email }).exec();
        if (user != null) {
          return true;
        } else throw new NotFoundException();
      } catch (err) {
        throw new UnauthorizedException();
      }
    }
  } else {
    throw new UnauthorizedException();
  }
};

export const generateToken = (email: string): string => {
  return jwt.sign({ email: email }, 'ajhasdhfjdafglkasfbsdjfd', {
    expiresIn: '3d',
  });
};

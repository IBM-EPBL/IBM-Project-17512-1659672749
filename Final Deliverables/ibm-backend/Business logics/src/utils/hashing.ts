import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { decode } from './decoding.utils';

export const hashPassword = (password: string) => {
  const saltRounds = 12;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const verifyPassword = async (
  email: string,
  password: string,
  model: Model<any>,
) => {
  const data = await model.findOne({ email: email }).exec();
  if (data != null) {
    const isMatch = await bcrypt.compare(decode(password), data.password);
    return isMatch;
  } else {
    throw new NotFoundException();
  }
};

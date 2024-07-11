import { User } from 'src/database/entities/user.entity';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  tableName: 'users',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
      nullable: false,
    },
    userName: {
      type: String,
      unique: true,
      nullable: false,
    },
    password: {
      type: String,
      nullable: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      nullable: false,
    },
    creationDate: {
      type: Date,
      nullable: false,
    },
  },
});

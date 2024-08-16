import { Chat } from './chat.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'users' })
@Unique('username-unq-const', ['userName'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  creationDate: Date;

  @ManyToMany(() => Chat)
  @JoinTable({ name: 'users_charts' })
  chats: Chat[];
}

import { Message } from './message.entity';
import { User } from './user.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'chats' })
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User)
  @JoinTable({ name: 'users_charts' })
  users: User[];

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}

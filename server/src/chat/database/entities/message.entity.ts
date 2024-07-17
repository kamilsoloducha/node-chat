import { Chat } from 'src/chat/database/entities/chat.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;
  @Column()
  timestamp: Date;

  @Column()
  userId: number;

  @ManyToOne(() => Chat, (chat) => chat.messages, { nullable: false })
  chat: Chat;
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum UserProfile {
  ADMIN = "ADMIN",
  COLABORADOR = "COLABORADOR",
  APROVADOR = "APROVADOR"
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserProfile
  })
  profile: UserProfile;
}

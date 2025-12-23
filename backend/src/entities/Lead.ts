import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  document: string; // CPF ou CNPJ

  @Column("decimal")
  income: number;

  @Column("decimal")
  loanValue: number;

  @Column({ default: "PENDENTE" })
  status: string;
}



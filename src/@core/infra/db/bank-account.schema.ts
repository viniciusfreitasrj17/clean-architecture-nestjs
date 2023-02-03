import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BankAccountSchemaTypeOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', scale: 2 })
  balance: number;

  @Column({ length: 255 })
  account_number: string;
}

// entidade anemica

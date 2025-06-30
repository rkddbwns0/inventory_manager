import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('companies')
export class CompaniesEntity {
  @PrimaryGeneratedColumn()
  company_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  pic_name: string;

  @Column({ type: 'varchar', length: 11, nullable: false })
  contact: string;

  @Column({ type: 'text', nullable: false })
  address: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}

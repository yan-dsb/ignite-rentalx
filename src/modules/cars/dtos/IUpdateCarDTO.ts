import { Specification } from '../infra/typeorm/entities/Specification';

interface IUpdateCarDTO {
  id: string;
  name?: string;
  description?: string;
  daily_rate?: number;
  license_plate?: string;
  fine_amount?: number;
  available?: boolean;
  brand?: string;
  category_id?: string;
  specifications?: Specification[];
}

export { IUpdateCarDTO };

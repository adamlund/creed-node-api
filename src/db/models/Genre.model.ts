import { Model, JSONSchema } from 'objection';

export class GenreModel extends Model {
  static tableName = 'genres';

  id!: number;
  name!: string;
  parent_id!: number;

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['id', 'name', 'parent_id'],
      properties: {
        id: { type: 'number' },
        name: { type: 'string ' },
        parent_id: { type: 'number' },
      },
    };
  }
}

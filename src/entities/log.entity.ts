import {
  BaseEntity,
  Entity,
  OptionalProps,
  PrimaryKey,
  Property,
  types,
} from '@mikro-orm/core';

@Entity()
export class Log extends BaseEntity<Log, 'id'> {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @PrimaryKey({ type: types.uuid, defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  data: string;

  @Property()
  handler: string;

  @Property({ name: 'created_at', defaultRaw: 'now()' })
  createdAt: Date;

  @Property({
    name: 'updated_at',
    defaultRaw: 'now()',
    onUpdate: () => new Date(),
  })
  updatedAt: Date;
}

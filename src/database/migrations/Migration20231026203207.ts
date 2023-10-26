import { Migration } from '@mikro-orm/migrations';

export class Migration20231026203207 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "log" ("id" uuid not null default gen_random_uuid(), "data" varchar(255) not null, "handler" varchar(255) not null, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), constraint "log_pkey" primary key ("id"));',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "log" cascade;');
  }
}

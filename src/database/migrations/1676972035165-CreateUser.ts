import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1676972035165 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "fullname",
                        type: "varchar"
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "avatar_url",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "document",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "is_active",
                        type: "integer",
                    },
                    {
                        name: "is_premium",
                        type: "integer"
                    },
                    {
                        name: "is_admin",
                        type: "integer"
                    },

                    {
                        name: "expires_premium",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "created_at",
                        type: "time",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "time",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}

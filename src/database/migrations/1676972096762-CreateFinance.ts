import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateFinance1676972096762 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "financings",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "total_portions",
                        type: "integer"
                    },
                    {
                        name: "total_portions_payments",
                        type: "integer"
                    },
                    {
                        name: "value_portion",
                        type: "integer"
                    },
                    {
                        name: "maturity_day",
                        type: "integer"
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "type",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },

                ],
                foreignKeys: [
                    {
                        name: 'FKUserInFinancing',
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ['user_id'],
                        onDelete: "SET NULL",
                        onUpdate: "CASCADE",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("financings")
    }

}

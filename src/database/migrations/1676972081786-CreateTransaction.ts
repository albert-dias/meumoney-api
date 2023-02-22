import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTransaction1676972081786 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "transactions",
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
                        name: "category_id",
                        type: "uuid"
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "value",
                        type: "integer"
                    },
                    {
                        name: "type",
                        type: "varchar"
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
                ],
                foreignKeys: [
                    {
                        name: 'FKUserInTransaction',
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ['user_id'],
                        onDelete: "SET NULL",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: 'FKCategoryInTransaction',
                        referencedTableName: "categories",
                        referencedColumnNames: ["id"],
                        columnNames: ['category_id'],
                        onDelete: "SET NULL",
                        onUpdate: "CASCADE",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transactions")
    }

}

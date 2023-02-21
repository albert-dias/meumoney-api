import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePortionPayment1676972106191 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "portion_payments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "portion_number",
                        type: "integer",
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "financing_id",
                        type: "uuid",
                    },
                    {
                        name: "value",
                        type: "integer",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKUserInPortionPayment',
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ['user_id'],
                        onDelete: "SET NULL",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: 'FKFinancingInPortionPayment',
                        referencedTableName: "categories",
                        referencedColumnNames: ["id"],
                        columnNames: ['financing_id'],
                        onDelete: "SET NULL",
                        onUpdate: "CASCADE",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("portion_payments")
    }

}

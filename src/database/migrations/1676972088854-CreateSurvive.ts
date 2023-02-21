import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateSurvive1676972088854 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "survives",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "description",
                        type: "varchar",
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
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKUserInSurvive',
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
        await queryRunner.dropTable("survives")
    }

}

import "reflect-metadata";
import SequelizeConnection from "./SequelizeConnection.js";
import { DataTypes, Model } from "sequelize";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class PostModel extends Model {
    @Field()
    declare content: string;

    @Field()
    declare createdAt: Date;

    @Field()
    declare id: number;

    @Field()
    declare updatedAt: Date;
}

PostModel.init(
    {
        content: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            },
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        underscored: true,
        sequelize: SequelizeConnection,
        modelName: "Post",
        hooks: {},
        tableName: "posts",
    }
);

export default PostModel;

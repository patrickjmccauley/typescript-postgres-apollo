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
    declare postId: number;
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
        postId: {
            type: DataTypes.NUMBER,
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

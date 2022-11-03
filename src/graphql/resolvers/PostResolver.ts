import "reflect-metadata";

import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from "type-graphql/dist/decorators/index.js";

import PostModel from "../../PostModel.js";

@Resolver(PostModel)
class PostResolver {
    @Query(() => [PostModel])
    async posts(@Ctx() _context: any): Promise<PostModel[]> {
        const posts = await PostModel.findAll();
        return posts;
    }

    @Mutation(() => PostModel)
    async createPost(
        @Ctx() _context: any,
        @Arg("content") content: string
    ): Promise<PostModel | null> {
        const post = await PostModel.create({ content });
        return post;
    }

    @Mutation(() => PostModel)
    async editPost(
        @Ctx() _context: any,
        @Arg("content") content: string,
        @Arg("id") id: number
    ): Promise<PostModel | null> {
        const [post, _] = await PostModel.upsert({
            content: content,
            id: id
        })
        return post;
    };
}

export default PostResolver;

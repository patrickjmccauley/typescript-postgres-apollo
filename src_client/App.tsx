import ApolloClient from "./ApolloClient";
import { ApolloProvider, gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";

const FETCH_QUERY = gql`
  query GetPosts {
    posts {
      content
      createdAt
      postId
    }
  }
`;

const MUTATION = gql`
  mutation MakePost($content: String!) {
    createPost(content: $content) {
      content
      createdAt
      postId
    }
  }
`;

// const SECOND_MUTATION = gql`
//   mutation EditPost($postId: String!, $newContent: String!) {
//     editPost(postId: $postId, newContent: $newContent) {
//       newContent
//       modifiedAt
//     }
//   }
// `

const PostList: React.FunctionComponent = () => {
  const { loading, error, data, refetch } = useQuery(FETCH_QUERY, {
    variables: {},
  });
  const [makeMutation, { loading: isMutationLoading, error: mutationError }] =
    useMutation(MUTATION);
  const [content, updateContent] = useState("");
  if (loading) {
    return <div></div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const posts: { content: string; createdAt: Date; postId: number }[] = data.posts.map(
    ({ content, createdAt, postId }: { content: string; createdAt: string; postId: number }) => ({
      content,
      createdAt: new Date(createdAt),
      postId: postId, //Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    })
  );

  return (
    <div>
      <div>
        <div>
          <h1>Test</h1>
        </div>
        <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "5px" }}>
          Make new post
        </div>
        <div>
          <input
            style={{ width: "100%", padding: "5px" }}
            placeholder="Enter post content"
            value={content}
            onChange={(e) => updateContent(e.target.value)}
          />
        </div>
        <div>
          <button
            style={{ marginTop: "5px", padding: "5px 10px" }}
            disabled={isMutationLoading}
            onClick={() => {
              makeMutation({
                variables: { content },
              }).then((result) => {
                if (!result.errors) {
                  updateContent("");
                  refetch();
                }
              });
            }}
          >
            Submit
          </button>
          <span style={{ marginLeft: "10px", color: "red" }}>
            {mutationError ? mutationError.message : ""}
          </span>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        {posts.map(({ content, createdAt }, idx) => (
          <div key={idx} style={{ marginTop: "20px" }}>
            <div style={{ fontSize: "12px", opacity: 0.5 }}>
              Posted: {createdAt.toISOString()}
            </div>
            <div>{content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <ApolloProvider client={ApolloClient}>
      <PostList />
    </ApolloProvider>
  );
};

export default App;

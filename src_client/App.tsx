import ApolloClient from "./ApolloClient";
import { Post, PostProperties } from "./Post";
import { ApolloProvider, gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";

const FETCH_QUERY = gql`
  query GetPosts {
    posts {
      content
      createdAt
      id
    }
  }
`;

const MUTATION = gql`
  mutation MakePost($content: String!) {
    createPost(content: $content) {
      content
      createdAt
      id
    }
  }
`;

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

  const posts: JSX.Element[] = data.posts.map(
    ({ content, createdAt, id, updatedAt }: PostProperties) => (
      <Post content={content} createdAt={createdAt} id={id} updatedAt={updatedAt}/>
    )
  );

  console.log(posts)

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
        {posts.map((post, idx) => (
          <div key={idx} style={{ marginTop: "20px" }}>
            {post}
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

import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
    mutation EditPost($content: String!, $id: number!) {
        editPost(content: $content, id: $id) {
            content
            id
        }
    }
`;

const disabledStyle = {
    border: "0pt",
    backgroundColor: "transparent"
}

export interface PostProperties {
  content: string,
  id: number,
  createdAt: string,
  updatedAt: string,
}

export function Post(props: PostProperties): JSX.Element {
    console.log(`Props is ${JSON.stringify(props)}`)
    const [currentContent, setCurrentContent] = useState(props.content)
    const [editMode, setEditMode] = useState(false)
    const [makeMutation, _] = useMutation(MUTATION);

    return (
    <div>
      <div style={{ fontSize: "12px", opacity: 0.5 }}>
                Posted: {new Date(props.createdAt).toISOString()}
                {props.updatedAt != props.createdAt ? 
                  `Edited: ${new Date(props.updatedAt)}`:
                  ""}
                <button
                  id={`button-${props.id}`}
                  style={{ border: "0pt", marginLeft: "5px",
                          color: "blue", fontWeight: "bold", backgroundColor: "transparent"}}
                  onClick={() => {
                    if (editMode) {
                        makeMutation({variables: { content: props.content, id: props.id }})
                    }
                    setEditMode(!editMode)
                    setCurrentContent(currentContent)
                    console.log(currentContent)
                  }}>
                    {editMode ? "save" : "edit"}
                </button>
      </div>
      <div>
        <input type="text" disabled={!editMode} value={currentContent}
                style={editMode ? {} : disabledStyle}
                onChange={(e) => setCurrentContent(e.target.value)}
                />
      </div>
    </div>
  )

}
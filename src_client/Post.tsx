import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const MUTATION = gql`
    mutation ModifyPost($content: String!, $id: Float!) {
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

const timestampStyle = { fontSize: "12px", opacity: 0.5 }

export interface PostProperties {
  content: string,
  id: number,
  createdAt: Date,
  updatedAt: Date,
}

export function Post(props: PostProperties): JSX.Element {
    console.log(`Props is ${JSON.stringify(props)}`)
    const [currentContent, setCurrentContent] = useState(props.content)
    const [editMode, setEditMode] = useState(false)
    const [makeMutation, _] = useMutation(MUTATION);

    const buildEditedBlock = () => {
      return (
        <div style={Object.assign({}, timestampStyle, {color: "red"})}>
          Edited: {props.updatedAt.toISOString()}
        </div>
      )
    }

    console.log(`Millis for created=${props.createdAt.toISOString()} vs \
     millis updated=${props.updatedAt.toISOString()}`)

    return (
    <div>
      <div style={timestampStyle}>
        Posted: {props.createdAt.toISOString()}
        <button
          id={`button-${props.id}`}
          style={{ border: "0pt", marginLeft: "5px",
                  color: "blue", fontWeight: "bold", backgroundColor: "transparent"}}
          onClick={() => {
            if (editMode) {
                makeMutation({variables: { content: currentContent, id: Math.trunc(props.id) }})
            }
            setEditMode(!editMode)
            setCurrentContent(currentContent)
            console.log(currentContent)
          }}>
            {editMode ? "save" : "edit"}
        </button>
      </div>
      {props.createdAt.toISOString() !== props.updatedAt.toISOString() ? buildEditedBlock() : ""}
      <div>
        <input type="text" disabled={!editMode} value={currentContent}
                style={editMode ? {} : disabledStyle}
                onChange={(e) => setCurrentContent(e.target.value)}
                />
      </div>
    </div>
  )

}
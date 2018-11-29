import React from "react";
import { Card, Icon, List } from "semantic-ui-react";

const ProjectCard = ({ ...props }) => (
  <Card href={`/project/${props.id}`}>
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
      <Card.Meta>Project</Card.Meta>
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
    {props.tags && (
      <Card.Content extra>
        <Icon name="tags" />
        <List horizontal style={{ marginLeft: "5px" }}>
          {props.tags.map(tag => (
            <List.Item key={tag}>{tag}</List.Item>
          ))}
        </List>
      </Card.Content>
    )}
  </Card>
);

export default ProjectCard;

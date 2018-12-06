import React from "react";
import { Card, Icon, List } from "semantic-ui-react";

const ProjectCard = ({ id, name, description, tags }) => (
  <Card href={`/project/${id}`}>
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>Project</Card.Meta>
      <Card.Description
        dangerouslySetInnerHTML={{
          __html: description
        }}
      />
    </Card.Content>
    {tags && (
      <Card.Content extra>
        <Icon name="tags" />
        <List horizontal style={{ marginLeft: "5px" }}>
          {tags.map(tag => (
            <List.Item key={tag}>{tag}</List.Item>
          ))}
        </List>
      </Card.Content>
    )}
  </Card>
);

export default ProjectCard;

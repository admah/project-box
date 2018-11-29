import React from "react";
import { Card } from "semantic-ui-react";

const ProjectCard = ({ ...project }) => (
  <Card key={project.id}>
    <Card.Content>
      <Card.Header>{project.name}</Card.Header>
      <Card.Description>{project.description}</Card.Description>
    </Card.Content>
  </Card>
);

export default ProjectCard;

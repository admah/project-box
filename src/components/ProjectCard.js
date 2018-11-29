import React from "react";
import { Card } from "semantic-ui-react";

const ProjectCard = ({ ...props }) => (
  <Card
    href={`/project/${props.id}`}
    header={props.name}
    description={props.description}
    meta="Project"
  />
);

export default ProjectCard;

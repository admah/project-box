import React from "react";
import PropTypes from "prop-types";
import { Card, Icon, Label, List } from "semantic-ui-react";

const ProjectCard = ({ id, name, description, tags }) => (
  <Card
    href={`${
      window.location.pathname === "/user/projects" ? "/user" : "/community"
    }/project/${id}`}
  >
    <Card.Content>
      <Label color="blue" ribbon>
        Project
      </Label>
      <Card.Header style={{ marginTop: "10px" }}>{name}</Card.Header>
      <Card.Description
        dangerouslySetInnerHTML={{
          __html: description.substring(0, 240)
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

ProjectCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired
};

export default ProjectCard;

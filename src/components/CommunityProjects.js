import React from "react";
import { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { Card, Container, Loader } from "semantic-ui-react";
import { listProjects } from "../graphql/queries";
import ProjectCard from "./ProjectCard";

const CommunityProjects = ({ match }) => {
  const filter = match.params.tag
    ? {
        public: { eq: true },
        tags: { contains: match.params.tag }
      }
    : {
        public: { eq: true }
      };

  return (
    <Container>
      <h1>Community Projects {match.params.tag && `: ${match.params.tag}`}</h1>
      <Card.Group
        style={{ marginTop: "30px" }}
        itemsPerRow={4}
        stackable={true}
      >
        <Connect
          query={graphqlOperation(listProjects, {
            filter: filter
          })}
        >
          {({ data: { listProjects }, loading, error }) => {
            if (error) return <h3>Error</h3>;
            if (loading || !listProjects)
              return <Loader active inline="centered" />;
            return listProjects.items.map(project => (
              <ProjectCard key={project.id} {...project} />
            ));
          }}
        </Connect>
      </Card.Group>
    </Container>
  );
};
export default CommunityProjects;

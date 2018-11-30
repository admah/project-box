// eslint-disable
// this is an auto generated file. This will be overwritten

export const getProject = `query GetProject($id: ID!) {
  getProject(id: $id) {
    id
    userId
    name
    description
    tags
    created
    startDate
    endDate
    steps {
      items {
        id
        name
        description
        time
      }
      nextToken
    }
    materials {
      items {
        id
        name
        quantityNeeded
        pricePerItem
        totalCost
        productUrl
      }
      nextToken
    }
    media {
      items {
        id
        caption
        src
      }
      nextToken
    }
  }
}
`;
export const listProjects = `query ListProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      name
      description
      tags
      created
      startDate
      endDate
      steps {
        items {
          id
          name
          description
          time
        }
        nextToken
      }
      materials {
        items {
          id
          name
          quantityNeeded
          pricePerItem
          totalCost
          productUrl
        }
        nextToken
      }
      media {
        items {
          id
          caption
          src
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getStep = `query GetStep($id: ID!) {
  getStep(id: $id) {
    id
    name
    project {
      id
      userId
      name
      description
      tags
      created
      startDate
      endDate
    }
    description
    time
  }
}
`;
export const listSteps = `query ListSteps(
  $filter: ModelStepFilterInput
  $limit: Int
  $nextToken: String
) {
  listSteps(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      project {
        id
        userId
        name
        description
        tags
        created
        startDate
        endDate
      }
      description
      time
    }
    nextToken
  }
}
`;
export const getMaterial = `query GetMaterial($id: ID!) {
  getMaterial(id: $id) {
    id
    project {
      id
      userId
      name
      description
      tags
      created
      startDate
      endDate
    }
    name
    quantityNeeded
    pricePerItem
    totalCost
    productUrl
  }
}
`;
export const listMaterials = `query ListMaterials(
  $filter: ModelMaterialFilterInput
  $limit: Int
  $nextToken: String
) {
  listMaterials(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      project {
        id
        userId
        name
        description
        tags
        created
        startDate
        endDate
      }
      name
      quantityNeeded
      pricePerItem
      totalCost
      productUrl
    }
    nextToken
  }
}
`;
export const getMedia = `query GetMedia($id: ID!) {
  getMedia(id: $id) {
    id
    project {
      id
      userId
      name
      description
      tags
      created
      startDate
      endDate
    }
    caption
    src
  }
}
`;
export const listMedias = `query ListMedias(
  $filter: ModelMediaFilterInput
  $limit: Int
  $nextToken: String
) {
  listMedias(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      project {
        id
        userId
        name
        description
        tags
        created
        startDate
        endDate
      }
      caption
      src
    }
    nextToken
  }
}
`;

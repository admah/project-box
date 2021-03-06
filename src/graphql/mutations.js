// eslint-disable
// this is an auto generated file. This will be overwritten

export const createProject = `mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    userId
    name
    description
    tags
    created
    startDate
    endDate
    public
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
export const updateProject = `mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
    id
    userId
    name
    description
    tags
    created
    startDate
    endDate
    public
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
export const deleteProject = `mutation DeleteProject($input: DeleteProjectInput!) {
  deleteProject(input: $input) {
    id
    userId
    name
    description
    tags
    created
    startDate
    endDate
    public
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
export const createStep = `mutation CreateStep($input: CreateStepInput!) {
  createStep(input: $input) {
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
      public
    }
    description
    time
  }
}
`;
export const updateStep = `mutation UpdateStep($input: UpdateStepInput!) {
  updateStep(input: $input) {
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
      public
    }
    description
    time
  }
}
`;
export const deleteStep = `mutation DeleteStep($input: DeleteStepInput!) {
  deleteStep(input: $input) {
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
      public
    }
    description
    time
  }
}
`;
export const createMaterial = `mutation CreateMaterial($input: CreateMaterialInput!) {
  createMaterial(input: $input) {
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
      public
    }
    name
    quantityNeeded
    pricePerItem
    totalCost
    productUrl
  }
}
`;
export const updateMaterial = `mutation UpdateMaterial($input: UpdateMaterialInput!) {
  updateMaterial(input: $input) {
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
      public
    }
    name
    quantityNeeded
    pricePerItem
    totalCost
    productUrl
  }
}
`;
export const deleteMaterial = `mutation DeleteMaterial($input: DeleteMaterialInput!) {
  deleteMaterial(input: $input) {
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
      public
    }
    name
    quantityNeeded
    pricePerItem
    totalCost
    productUrl
  }
}
`;
export const createMedia = `mutation CreateMedia($input: CreateMediaInput!) {
  createMedia(input: $input) {
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
      public
    }
    caption
    src
  }
}
`;
export const updateMedia = `mutation UpdateMedia($input: UpdateMediaInput!) {
  updateMedia(input: $input) {
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
      public
    }
    caption
    src
  }
}
`;
export const deleteMedia = `mutation DeleteMedia($input: DeleteMediaInput!) {
  deleteMedia(input: $input) {
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
      public
    }
    caption
    src
  }
}
`;

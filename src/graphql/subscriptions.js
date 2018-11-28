// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateProject = `subscription OnCreateProject {
  onCreateProject {
    id
    userId
    name
    steps {
      items {
        id
        title
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
    startTime
    endTime
    totalCost
  }
}
`;
export const onUpdateProject = `subscription OnUpdateProject {
  onUpdateProject {
    id
    userId
    name
    steps {
      items {
        id
        title
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
    startTime
    endTime
    totalCost
  }
}
`;
export const onDeleteProject = `subscription OnDeleteProject {
  onDeleteProject {
    id
    userId
    name
    steps {
      items {
        id
        title
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
    startTime
    endTime
    totalCost
  }
}
`;
export const onCreateStep = `subscription OnCreateStep {
  onCreateStep {
    id
    title
    project {
      id
      userId
      name
      startTime
      endTime
      totalCost
    }
    name
    description
    time
  }
}
`;
export const onUpdateStep = `subscription OnUpdateStep {
  onUpdateStep {
    id
    title
    project {
      id
      userId
      name
      startTime
      endTime
      totalCost
    }
    name
    description
    time
  }
}
`;
export const onDeleteStep = `subscription OnDeleteStep {
  onDeleteStep {
    id
    title
    project {
      id
      userId
      name
      startTime
      endTime
      totalCost
    }
    name
    description
    time
  }
}
`;
export const onCreateMaterial = `subscription OnCreateMaterial {
  onCreateMaterial {
    id
    project {
      id
      userId
      name
      startTime
      endTime
      totalCost
    }
    name
    quantityNeeded
    pricePerItem
    totalCost
    productUrl
  }
}
`;
export const onUpdateMaterial = `subscription OnUpdateMaterial {
  onUpdateMaterial {
    id
    project {
      id
      userId
      name
      startTime
      endTime
      totalCost
    }
    name
    quantityNeeded
    pricePerItem
    totalCost
    productUrl
  }
}
`;
export const onDeleteMaterial = `subscription OnDeleteMaterial {
  onDeleteMaterial {
    id
    project {
      id
      userId
      name
      startTime
      endTime
      totalCost
    }
    name
    quantityNeeded
    pricePerItem
    totalCost
    productUrl
  }
}
`;
export const onCreateMedia = `subscription OnCreateMedia {
  onCreateMedia {
    id
    project {
      id
      userId
      name
      startTime
      endTime
      totalCost
    }
    caption
    src
  }
}
`;
export const onUpdateMedia = `subscription OnUpdateMedia {
  onUpdateMedia {
    id
    project {
      id
      userId
      name
      startTime
      endTime
      totalCost
    }
    caption
    src
  }
}
`;
export const onDeleteMedia = `subscription OnDeleteMedia {
  onDeleteMedia {
    id
    project {
      id
      userId
      name
      startTime
      endTime
      totalCost
    }
    caption
    src
  }
}
`;

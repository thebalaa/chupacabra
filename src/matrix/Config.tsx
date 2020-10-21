export const FILTER_CONFIG = {
  room: {
    state: {
      limit: 0,
      not_types: ['*']
    },
    timeline: {
      limit: 50,
      types: [
        "m.room.message"
      ]
    },
    ephemeral: {
      limit: 0,
      not_types: ["*"]
    }
  },
  presence: {
    limit: 0,
    not_types: ["*"]
  },
  account_data: {
    limit: 0,
    not_types: ["*"]
  },
  event_format: "client",
  
}

export const VALIDATE_STATUS = (status: number) => {
    return status < 500;
}

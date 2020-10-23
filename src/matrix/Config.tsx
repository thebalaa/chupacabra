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

export const getRoomFilter = (roomId: string) => {return {
  room: {
    rooms: [roomId],
    state: {
      limit: 0,
      not_types: ['*']
    },
    timeline: {
      limit: 10,
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

}}

export const VALIDATE_STATUS = (status: number) => {
    return status < 500;
}

// TODO: Find a better way to handle updating login / stored cred interface
// Hopefully not updated often
export const MATRIX_CREDS_STORAGE_KEY = 'chupacabra_matrix_creds_1'

export const CLIENT_API_PATH = '/_matrix/client/r0'
export const MEDIA_API_PATH = '/_matrix/media/r0'

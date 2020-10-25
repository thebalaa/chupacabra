import {atom, selector} from 'recoil'
import {getJoinedRooms} from '../matrix/Rooms'


export const joinedRoomsState = selector<Array<string>>({
  key: 'JoinedRooms',
  get: async({get}) => {
    return await getJoinedRooms()
  }
})

export const followedRoomsState = atom<Set<string>>({
  key: 'FollowedRooms',
  default: new Set<string>()
})

import { atomFamily, atom} from 'recoil'
import {article} from './test'

type PostType = {
  chupacabra_source: string,
  remote_source: string,
  title: string,
  html: string
}

export const postState = atomFamily<PostType, string>({
  key: 'Post',
  default: {
    chupacabra_source: '#PatrickTech:tincan.community',
    remote_source: 'Twitter',
    html: article,
    title: 'MAS wins in Bolivia!'
  },
})

export const postList = atom<Array<string>>({
  key: 'PostList',
  default: ['one'] //Array<string>()
})

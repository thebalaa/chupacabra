import React, {useState} from 'react';
import {loadMedia} from '../matrix/Media'

interface MatrixMediaProps {
  uri: string
}

const MatrixMedia: React.FC<MatrixMediaProps> = ({uri}) => {
  const [content, setContent] = useState<string>()
  if(!content){
    loadMedia(uri).then((res: any) => setContent(res.data))
  }
  return (
    <>
    {content && <div dangerouslySetInnerHTML={{__html: content}}/>}
    </>
  )
}

export default MatrixMedia;

import React from 'react'
import {useRecoilValue} from 'recoil'
import {sourceState} from '../recoil/source'
import {IonChip} from '@ionic/react'

interface SourceChipProps {
  chupacabra_source: string
}

const SourceChip: React.FC<SourceChipProps> = ({chupacabra_source}) => {
  const source = useRecoilValue(sourceState(chupacabra_source))
  return (
    <IonChip>
      {source.name}
    </IonChip>
  )
}

export default SourceChip

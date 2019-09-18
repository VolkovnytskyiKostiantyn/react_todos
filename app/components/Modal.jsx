// @flow

import * as React from 'react'
import Modal from 'react-modal'
import { observer } from 'mobx-react'
import { inject } from './typedInject'


type Props = {
  store: {
    showModal: Boolean,
    modalInnerText: string,
    modalClose: () => void,
  },
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

@observer
class ModalWindow extends React.Component<Props> {
  render() {
    const { store: { showModal, modalClose, modalInnerText } } = this.props
    return (
      <Modal isOpen={showModal} style={customStyles} shouldCloseOnOverlayClick>
        <div className="modal-window">
          { modalInnerText }
        </div>
        <button type="button" className="close-modal-button" onClick={modalClose}>Close</button>
      </Modal>
    )
  }
}

const InjectedModalWindow = inject(({ store }) => ({ store }))(ModalWindow)


export default InjectedModalWindow

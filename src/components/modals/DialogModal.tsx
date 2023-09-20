import { FC } from 'hono/jsx'

const DialogModal: FC<{}> = (props) => {
  return (
    <div
      id="modal"
      _={'on closeModal add .closing then wait for animationend then remove me'}
    >
      <div
        class="modal-underlay"
        _="on click or keyup[key=='Escape'] from window trigger closeModal"
      />
      <div class="modal-content">{props.children}</div>
    </div>
  )
}

export default DialogModal

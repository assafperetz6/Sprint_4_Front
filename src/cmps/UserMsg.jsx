import { eventBus, showSuccessMsg } from '../services/event-bus.service'
import { useState, useEffect, useRef } from 'react'
import { svgs } from '../services/svg.service'
import { sv } from 'react-day-picker/locale'

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      setMsg(msg)
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })

    return () => {
      unsubscribe()
    }
    
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  function msgClass() {
    return msg ? 'visible' : ''
  }

  function getIcon() {
    if (msg?.type === 'success') return svgs.success
    if (msg?.type === 'error') return svgs.closeBox
  }
  const typeIcon = getIcon()

  return (
    <section className={`user-msg ${msg?.type} ${msgClass()}`}>
      <div className="indicator-icon flex align-center justify-center">{typeIcon}</div>
      {msg?.txt}
      <button onClick={closeMsg}>x</button>
    </section>
  )
}

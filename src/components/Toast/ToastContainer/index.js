import { useState, useEffect, useCallback } from 'react';
import { ToastMessage } from '../ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';

export function ToastCotainer() {
  const [messages, setMessages] = useState([]);
  const [pendingRemovalMessagesId, setPendingRemovalMessagesId] = useState([]);
  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }
    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setPendingRemovalMessagesId((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
    setPendingRemovalMessagesId((prevState) => prevState.filter((messageId) => messageId !== id));
  }, []);

  return (
    <Container>
      {
        messages.map((message) => (
          <ToastMessage
            key={message.id}
            message={message}
            onRemoveMessage={handleRemoveMessage}
            isLeaving={pendingRemovalMessagesId.includes(message.id)}
            onAnimationEnd={handleAnimationEnd}
          />
        ))
      }
    </Container>
  );
}

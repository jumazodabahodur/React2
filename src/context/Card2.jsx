import React, { useContext } from 'react'
// Добавляем фигурные скобки вокруг Context, так как это именованный экспорт
import { Context } from "../App.jsx"
// ...existing code..." 

const Card2 = () => {
  // Теперь countState получит значение переменной count из App
  const countState = useContext(Context)

  return (
    <div style={{ border: '1px solid red', padding: '10px', marginTop: '10px' }}>           
        <h4>Компонент Card2</h4>
        {/* Выводим значение напрямую, так как это число */}
        <p>Значение из контекста: {countState}</p>
    </div>
  )
}

export default Card2
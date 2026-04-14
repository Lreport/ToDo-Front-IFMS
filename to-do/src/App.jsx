import { useState } from 'react'
import './App.css'

function App() {
  const [taskText, setTaskText] = useState('')
  const [tasks, setTasks] = useState([])
  const statusOrder = ['idle', 'in-progress', 'done']

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTask = taskText.trim()
    if (!trimmedTask) {
      return
    }

    const newTask = {
      id: crypto.randomUUID(),
      text: trimmedTask,
      status: 'idle',
    }

    setTasks((currentTasks) => [newTask, ...currentTasks])
    setTaskText('')
  }

  function handleToggleTaskStatus(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task
        }

        const currentIndex = statusOrder.indexOf(task.status)
        const nextIndex = (currentIndex + 1) % statusOrder.length

        return {
          ...task,
          status: statusOrder[nextIndex],
        }
      }),
    )
  }

  return (
    <>
      <header className="app-header">
        <button type="button" className="app-header__menu" aria-label="Abrir menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="app-header__content">
          <h1>Lista de Tarefas</h1>
        </div>
      </header>

      <main className="app-main">
        
        <section className="task-board" aria-label="Conteudo principal">
          <form className="task-form" onSubmit={handleSubmit}>
            <label className="task-form__field">
              <span className="task-form__label">Digite uma tarefa</span>
              <input
                type="text"
                value={taskText}
                onChange={(event) => setTaskText(event.target.value)}
                placeholder="Ex.: Estudar React hoje a noite"
              />
            </label>

            <button type="submit" className="task-form__submit">
              Concluir
            </button>
          </form>

          <section className="task-list" aria-label="Lista de tarefas criadas">
            {tasks.length === 0 ? (
              <p className="task-list__empty">
                Nenhuma tarefa adicionada ainda.
              </p>
            ) : (
              tasks.map((task) => (
                <article
                  key={task.id}
                  className={`task-card task-card--${task.status}`}
                >
                  <button
                    type="button"
                    className={`task-card__status task-card__status--${task.status}`}
                    onClick={() => handleToggleTaskStatus(task.id)}
                    aria-label={`Alterar status da tarefa ${task.text}`}
                  ></button>

                  <p>{task.text}</p>
                </article>
              ))
            )}
          </section>
        </section>
      </main>
    </>
  )
}

export default App

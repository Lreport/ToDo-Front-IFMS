import { useState } from 'react'
import './App.css'

function App() {
  // Texto atual digitado no campo do formulario.
  const [taskText, setTaskText] = useState('')
  // Lista de tarefas exibidas na tela.
  const [tasks, setTasks] = useState([])
  // Ordem usada para alternar o status ao clicar no circulo.
  const statusOrder = ['idle', 'in-progress', 'done']

  function handleSubmit(event) {
    event.preventDefault()

    // Remove espacos extras para evitar tarefas vazias.
    const trimmedTask = taskText.trim()
    if (!trimmedTask) {return}

    // Cada tarefa nasce sem status definido.
    const newTask = {
      id: crypto.randomUUID(),
      text: trimmedTask,
      status: 'idle',
    }

    // Adiciona a nova tarefa no topo da lista e limpa o campo.
    setTasks((currentTasks) => [newTask, ...currentTasks])
    setTaskText('')
  }

  function handleToggleTaskStatus(taskId) {
    // Percorre a lista e altera apenas a tarefa clicada.
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {return task}

        // Gira entre vazio -> azul -> verde -> vazio.
        const currentIndex = statusOrder.indexOf(task.status)
        const nextIndex = (currentIndex + 1) % statusOrder.length

        return {...task, status: statusOrder[nextIndex],}
      }),
    )
  }

  return (
    <>
      {/* Barra superior da aplicacao. */}
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
        {/* Area principal com formulario e lista de tarefas. */}
        <section className="task-board" aria-label="Conteudo principal">
          {/* Formulario para criar uma nova tarefa. */}
          <form className="task-form" onSubmit={handleSubmit}>
            <label className="task-form__field">
              <span className="task-form__label">Digite uma tarefa</span>
              <input
                type="text"
                value={taskText}
                onChange={(event) => setTaskText(event.target.value)}
                placeholder="Ex: Comer Mandioca"
              />
            </label>

            <button type="submit" className="task-form__submit">
              Concluir
            </button>
          </form>

          {/* Lista renderizada dinamicamente a partir do estado tasks. */}
          <section className="task-list" aria-label="Lista de tarefas criadas">
            {tasks.length === 0 ? (
              <p className="task-list__empty">
                Nenhuma tarefa adicionada ainda.
              </p>
            ) : (
              tasks.map((task) => (
                // Cada card representa uma tarefa e muda de estilo conforme o status.
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

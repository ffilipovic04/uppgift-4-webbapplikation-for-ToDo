//Skapar en array för samtliga ToDO-objekt
let todos = []

//Hämtar och sparar referenser till DOM-element för att kunna hantera att göra-listans logik och uppdatera gränssnittet 
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-message');
const completedCountEl = document.getElementById('completed-count');

//Rensar den befintliga listan i HTML och ritar upp alla ToDo-uppgifter på nytt från arrayen
function renderTodos() {
    todoList.innerHTML = '';

    //Loopar igenom alla uppgifter i arrayen
    todos.forEach(todo => {
        //Skapar ny listelement <li> för uppgiften
        const li = document.createElement('li');

        //Om objektet i arrayen är markerad som klar, har 'completed:true, läggs klassen till
        if (todo.completed) {
            li.classList.add('completed');
        
        }

        //Skapar nytt element för att hålla själva texten i uppgiften
        const textSpan = document.createElement('span');
        textSpan.textContent = todo.text;
        li.appendChild(textSpan);

        //Papperskorg som raderar efter varje klick på knappen/symbolen
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);

        //
        li.addEventListener('click', (event) => {
            //Kontrollerar så man inte klickat på papperskorgen av misstag
            if (event.target !== deleteBtn) {
                todo.completed = !todo.completed;
                renderTodos(); //Ritar om listan för att synka HTML med arrayen
            }
        });

        //När man klickar på papperskorgen så raderas just detta objekt och arrayen filtreras
        deleteBtn.addEventListener('click', () => {
            todos = todos.filter(item => item.id !== todo.id); //Tar bort från arrayen
            renderTodos(); //Ritar om för att synka HTML med arrayen
        });

        todoList.appendChild(li); //Lägger till färdiga listelementet i <ul> i HTML
    });

    updateCounter();
}

//Uppdaterar en liten ettiket någonstans med antalet uppgifter som man gjort
function updateCounter() {
    const completedCount = todos.filter(todo => todo.completed).length;
    completedCountEl.textContent = completedCount;    
}

//Skriva in en uppgift i ett <input>-fält och lägga till den
function addTodo() {
    const todoText = todoInput.value.trim();

    //Om man klickar på knappen när fältet är tomt ska man få meddelandet som står nedan
    if (todoText === '') {
        errorMessage.textContent = 'Du måste skriva något!';
        return; 
    }

    //Rensar felmeddelandet om använder skrev något
    errorMessage.textContent = '';

    //Får unikt ID med Date.now som behövs för att veta exakt vilket objekt som ska tas bort
    const newTodo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    todos.push(newTodo); //Lägger till i arrayen
    todoInput.value = ''; //Input-fältet töms efter man klickat på knappen
    renderTodos(); //Nya listan ritas ut
}

//Klicka på en knapp för att lägga till uppgiften
addBtn.addEventListener('click',addTodo);


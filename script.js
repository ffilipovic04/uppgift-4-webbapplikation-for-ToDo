//Skapar en array för samtliga ToDO-objekt
let todos = []

//Hämtar och sparar variabler till DOM-element för att kunna hantera att göra-listans logik och uppdatera gränssnittet 
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

        //Papperskorg som raderar efter varje klick på symbolen
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);

        //Lyssnar efter klick på själva listraden för att markera en uppgift som klar eller oklar
        li.addEventListener('click', (event) => {
            //Kontrollerar så man inte klickat på papperskorgen av misstag
            if (event.target !== deleteBtn) {
                // Vänder på statusen (om completed var false blir det true, och tvärtom)
                todo.completed = !todo.completed;
                if (todo.completed) {
                    li.classList.add('completed');
                }
                else {
                    li.classList.remove('completed');
                }
                // Uppdaterar direkt siffran i räknaren högst upp så att antalet klara uppgifter stämmer
                updateCounter();
            }
        });

        //När man klickar på papperskorgen så raderas just detta objekt och arrayen filtreras
        deleteBtn.addEventListener('click', () => {
            todos = todos.filter(item => item.id !== todo.id); //Tar bort från arrayen
            li.remove(); // Tar bort det specifika listelementet direkt från skärmen (HTML)
            updateCounter(); // Uppdaterar siffran i räknaren så att antalet klara uppgifter stämmer
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
        errorMessage.textContent = 'Input must not be empty';
        
        errorMessage.classList.remove('blink-red');
        void errorMessage.offsetWidth
        errorMessage.classList.add('blink-red');
        
        return; 
}

    //Rensar felmeddelandet och animationsklassen om använder skrev något
    errorMessage.textContent = '';
    errorMessage.classList.remove('blink-red');

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

//Alternativ 1: Använder klickar med musen på "Lägg till" knappen
addBtn.addEventListener('click',addTodo);

// Alternativ 2: Använder trycker på "Enter-tangenten" på tangentbordet
todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }

});

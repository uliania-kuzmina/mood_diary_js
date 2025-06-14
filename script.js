let moods = []

function addMood() {
    let moodCategory = document.getElementById("moodCategory").value;
    let commit = document.getElementById("moodCommit").value.trim();
    let date = new Date().toLocaleDateString();
    let color = document.getElementById("moodColor").value;

    if (!moodCategory) {
        return alert("Выберите настроение!")
    }
    
    let table = document.getElementById("moodTable");
    let row = table.insertRow();
    row.style.backgroundColor = color;
    
    row.insertCell(0).textContent = date;
    row.insertCell(1).textContent = moodCategory;
    row.insertCell(2).textContent = commit;


    //кнопка удаления
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.classList.add("delete-btn", "btn")
    deleteButton.onclick = function() {
        row.remove();
        saveMood();
    }

    let actionCell = row.insertCell(3);
    actionCell.appendChild(deleteButton)

    document.getElementById("moodCommit").value = "";

    saveMood();
}

//кнопка очистить
function deleteMood() {
    document.getElementById("moodTable").innerHTML = "";
    localStorage.removeItem("moods");
}

//сохранение в LocalStorage
function saveMood() {
    let moods = [];
    document.querySelectorAll("#moodTable tr").forEach(row => {
        if (row.cells.length > 2) {
            let date = row.cells[0].textContent;
            let category = row.cells[1].textContent;
            let commit = row.cells[2].textContent;
            let color = row.style.backgroundColor;

            moods.push({date, category, commit, color});
        }
    })

    localStorage.setItem("moods", JSON.stringify(moods));
}

//выгрузка из LocalStorage
function loadMood() {
    let savedMood = JSON.parse(localStorage.getItem("moods")) || [];
    let table = document.getElementById("moodTable");

    savedMood.forEach(mood => {
        let row = table.insertRow();
        row.style.backgroundColor = mood.color;

        row.insertCell(0).textContent = mood.date;
        row.insertCell(1).textContent = mood.category;
        row.insertCell(2).textContent = mood.commit;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.classList.add("delete-btn", "btn")
        deleteButton.onclick = function() {
            row.remove();
            saveMood();
        }
    
        let actionCell = row.insertCell(3);
        actionCell.appendChild(deleteButton)
    })
}

// темная тема
function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

window.onload = function() {
    loadMood();

    if (localStorage.getItem("theme") == "dark") {
        document.body.classList.add("dark-mode");
    }
}

if (!localStorage.getItem("theme")) {
    if (window.matchMedia("(prefers-color-scheme: dark").matches) {
        document.body.classList.add("dark-mode")
    }
}

document.getElementById("toggleTheme").addEventListener("click", toggleTheme);

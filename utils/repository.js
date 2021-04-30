module.exports = {
    mochaTimeout: 50000,
    timeout: 5000,
    baseUrl: "http://localhost:3000/",
    taskUrl: "http://localhost:3000/tasks",

    // Login Page Locators
    email: "div > input[type=email]",
    password: "div > input[type=password]",
    signIn: "div > input[type=submit]",
    alertMessage: "div > div.alert.alert-danger",
    alertMessageTxt: "Désolé, les identifiants sont incorrects.",
    // Login Page testData
    emailTxt: "test@test.com",
    incorrectEmailTxt: "abc@abc.com",
    passwordTxt: "test",
    incorrectPasswordTxt: "abc",

    // Task Page Locators
    task: "//label[text()='Nom de la tâche']/following-sibling::input",
    taskDesc: "//label[text()='Description de la tâche en une ligne']/following-sibling::input",
    addTask: "//button[text()='Ajouter la tâche']",
    deleteTask: "//a[text()='Supprimer']",
    changeTaskStatus: "//ul/li/span/div",
    taskMenuLink: "//a[text()='Tâches']",
    logoutMenuLink: "//a[text()='Déconnexion']",
    // Task Page testData
    taskTxt: "Task 1",
    taskDescTxt: "Tast 1 description",
};
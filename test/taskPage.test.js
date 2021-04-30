const chai = require("chai"),
    expect = chai.expect,
    LoginPage = require("../pages/loginPage"),
    TaskPage = require("../pages/taskPage"),
    DriverManager = require('../driver/DriverManager'),
    repository = require("../utils/repository");

const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

let loginPage, driver;
const mochaTimeout = repository.mochaTimeout,
    taskUrl = repository.taskUrl,
    baseUrl = repository.baseUrl;

describe("Task Test", async function() {
    this.timeout(mochaTimeout);

    before(async function() {
        driver = DriverManager.buildDriver();
        loginPage = new LoginPage(driver);
        taskPage = new TaskPage(driver);
        await loginPage.visit(baseUrl);
        await loginPage.openApp();
    });


    it("Cliquer sur le bouton de connexion et vérifiez l'URL", async function() {
        const url = await loginPage.login();
        expect(url).to.equal(taskUrl);
    });

    it("Vérifier que les liens 'Tâches' et 'Déconnexion' sont visibles lorsque l'utilisateur est connecté", async function() {
        const taskIsVisible = await taskPage.taskMenuLink();
        const logoutIsVisible = await taskPage.logoutMenuLink();
        expect(taskIsVisible).to.be.true;
        expect(logoutIsVisible).to.be.true;
    });

    it("Vérifier que le bouton 'Ajouter la tâche' n'est pas activé lorsque les champs 'Nom de la tâche' et 'Description de la tâche en une ligne' sont vides", async function() {
        const result = await taskPage.addTaskButton();
        expect(result.state).to.be.false;
    });

    it("Vérifier que les données sont ajoutées dans le localStorage", async function() {
        const data = await taskPage.addTask();
        expect(data.name).to.be.true;
        expect(data.description).to.be.true;

    });

    it("Vérifier que l'état de la tâche est modifié dans le localStorage", async function() {
        const data = await taskPage.changeTaskStatus();
        expect(data.completed).to.be.true;

    });

    it("Vérifier que les données sont supprimées dans le localStorage", async function() {
        const data = await taskPage.deleteTask();
        expect(data.name).to.be.true;
        expect(data.description).to.be.true;

    });

    after(async function() {
        await loginPage.quit();
    });
});
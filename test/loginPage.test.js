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
    alertMessageTxt = repository.alertMessageTxt,
    baseUrl = repository.baseUrl;

describe("Login Test", async function() {
    this.timeout(mochaTimeout);

    before(async function() {
        driver = DriverManager.buildDriver();
        loginPage = new LoginPage(driver);
        taskPage = new TaskPage(driver);
        await loginPage.visit(baseUrl);
        await loginPage.openApp();
    });


    it("Vérifier que le bouton de connexion n'est pas activé lorsque les champs d'e-mail et de mot de passe sont vides", async function() {
        const result = await loginPage.signInButton();
        expect(result.state).to.be.false;
    });

    it("Vérifier que les liens 'Tâches' et 'Déconnexion' ne sont pas visibles lorsque l'utilisateur n'est pas connecté", async function() {
        const taskIsVisible = await taskPage.taskMenuLink();
        const logoutIsVisible = await taskPage.logoutMenuLink();
        expect(taskIsVisible).to.be.false;
        expect(logoutIsVisible).to.be.false;
    });


    it("Vérifier que le bouton de connexion n'est pas activé lorsque les champs d'e-mail et de mot de passe sont vides", async function() {
        const result = await loginPage.signInButton();
        expect(result.state).to.be.false;
    });


    it("Vérifier que le message d'alerte rouge apparaît lorsque l'e-mail et/ou le mot de passe sont incorrects", async function() {
        let result = await loginPage.alertMessage();
        expect(result.text).to.equal(alertMessageTxt);
    });

    after(async function() {
        await loginPage.quit();
    });

});
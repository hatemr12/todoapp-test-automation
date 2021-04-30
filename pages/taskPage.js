const repository = require("../utils/repository");
let BasePage = require("./basePage");

/**
 * Locators for the elements in this page
 * @type {string}
 */

const task = repository.task,
    taskDesc = repository.taskDesc,
    addTask = repository.addTask,
    deleteTask = repository.deleteTask,
    changeTaskStatus = repository.changeTaskStatus,
    taskTxt = repository.taskTxt,
    taskDescTxt = repository.taskDescTxt,
    taskMenuLink = repository.taskMenuLink,
    logoutMenuLink = repository.logoutMenuLink,
    timeout = repository.timeout;

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */
function TaskPage(webdriver) {
    BasePage.call(this, webdriver);
}

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */
TaskPage.prototype = Object.create(BasePage.prototype);
TaskPage.prototype.constructor = TaskPage;

TaskPage.prototype.getTitle = async function() {
    const title = await this.driver.getTitle();
    return title;
};

TaskPage.prototype.addTaskButton = async function() {
    let addTaskButton = await this.findByXpath(addTask);
    await this.elementIsEnabled(addTaskButton);
    const enabledState = await addTaskButton.isEnabled();
    const result = await this.driver.wait(async function() {
        return {
            state: enabledState
        }
    }, timeout);
    return result;
};

TaskPage.prototype.taskMenuLink = async function() {
    let taskLink = await this.findByXpath(taskMenuLink);
    let isVisible = await this.elementIsVisible(taskLink);
    return isVisible;
};

TaskPage.prototype.logoutMenuLink = async function() {
    let logoutLink = await this.findByXpath(logoutMenuLink);
    let isVisible = await this.elementIsVisible(logoutLink);
    return isVisible;
};

TaskPage.prototype.addTask = async function() {
    let taskInput = await this.findByXpath(task);
    let taskDescInput = await this.findByXpath(taskDesc);
    await this.write(taskInput, taskTxt);
    await this.write(taskDescInput, taskDescTxt);
    let addTaskBtn = await this.findByXpath(addTask);
    await this.click(addTaskBtn);
    await this.elementIsVisible(await this.findByXpath(changeStatus));
    const tasks = await this.driver.executeScript("return window.localStorage.getItem('tasks')");
    let result = {};
    JSON.parse(tasks, function(key, value) {
        if (key == "name" && value === taskTxt) {
            result.name = true;
        }
        if (key == "description" && value === taskDescTxt) {
            result.description = true;
        }
    });
    return result;
};

TaskPage.prototype.deleteTask = async function() {
    let deleteTaskBtn = await this.findByXpath(deleteTask);
    await this.click(deleteTaskBtn);
    const tasks = await this.driver.executeScript("return window.localStorage.getItem('tasks')");
    let result = {};
    JSON.parse(tasks, function(key, value) {
        if (key == "name" && value !== taskTxt) {
            result.name = true;
        }
        if (key == "description" && value !== taskDescTxt) {
            result.description = true;
        }
    });
    return result;
};

TaskPage.prototype.changeTaskStatus = async function() {
    let changeStatusBtn = await this.findByXpath(changeTaskStatus);
    await this.click(changeStatusBtn);
    const tasks = await this.driver.executeScript("return window.localStorage.getItem('tasks')");
    let result = {};
    JSON.parse(tasks, function(key, value) {
        if (key == "completed" && value === true) {
            result.completed = true;
        }
    });
    return result;
};

TaskPage.prototype.takeScreenShot = async function() {
    return await this.driver.takeScreenshot();
}
module.exports = TaskPage;
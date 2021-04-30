const repository = require("../utils/repository");
let BasePage = require("./basePage");

/**
 * Locators for the elements in this page
 * @type {string}
 */

const email = repository.email,
    password = repository.password,
    signIn = repository.signIn,
    alertMessage = repository.alertMessage,
    emailTxt = repository.emailTxt,
    passwordTxt = repository.passwordTxt,
    incorrectEmailTxt = repository.incorrectEmailTxt,
    incorrectPasswordTxt = repository.incorrectPasswordTxt,
    timeout = repository.timeout;

/**
 * Constructor for Login Page
 * @param webdriver
 * @constructor
 */
function LoginPage(webdriver) {
    BasePage.call(this, webdriver);
}

/**
 * BasePage and Constructor wiring
 * @type {BasePage}
 */
LoginPage.prototype = Object.create(BasePage.prototype);
LoginPage.prototype.constructor = LoginPage;

LoginPage.prototype.getTitle = async function() {
    const title = await this.driver.getTitle();
    return title;
};

LoginPage.prototype.userEmail = async function() {
    const clickUserEmail = await this.findByCss(email);
    await this.write(clickUserEmail, emailTxt);
    let isEnabled = await clickUserEmail.isEnabled();

    return await this.driver.wait(async function() {
        return isEnabled;
    }, timeout);
};

LoginPage.prototype.incorrectUserEmail = async function() {
    const clickUserEmail = await this.findByCss(email);
    await this.write(clickUserEmail, incorrectEmailTxt);
};

LoginPage.prototype.userPassword = async function() {
    const clickUserPassword = await this.findByCss(password);
    await this.write(clickUserPassword, passwordTxt);
    let isEnabled = await clickUserPassword.isEnabled();

    return await this.driver.wait(async function() {
        return isEnabled;
    }, timeout);
};

LoginPage.prototype.incorrectUserPassword = async function() {
    const clickUserPassword = await this.findByCss(password);
    await this.write(clickUserPassword, incorrectPasswordTxt);
};

LoginPage.prototype.signInButton = async function() {
    let signInButton = await this.findByCss(signIn);

    await this.elementIsEnabled(signInButton);

    const enabledState = await signInButton.isEnabled();
    const btnResult = await this.driver.wait(async function() {
        return {
            state: enabledState
        }
    }, timeout);
    return btnResult;
};

LoginPage.prototype.clicksignInButton = async function() {
    let signInButton = await this.findByCss(signIn);
    await this.click(signInButton);
    return await this.driver.getCurrentUrl();
}

LoginPage.prototype.login = async function() {
    await this.userEmail();
    await this.userPassword();
    let url = await this.clicksignInButton();
    return url;
}

LoginPage.prototype.alertMessage = async function() {
    await this.incorrectUserEmail();
    await this.incorrectUserPassword();
    await this.clicksignInButton();
    let alertMessageTxt = await this.findByCss(alertMessage);

    await this.elementIsVisible(alertMessageTxt);

    const alertTxt = await alertMessageTxt.getText();

    const result = await this.driver.wait(async function() {
        return {
            text: alertTxt
        }
    }, timeout);
    return result;
}

LoginPage.prototype.takeScreenShot = async function() {
    return await this.driver.takeScreenshot();
}
module.exports = LoginPage;
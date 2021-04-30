# TODO-APP - Test Automation

Install Node modules with command : 
```bash
npm i
```

Run test
```bash
npm run test
```

Folder Structure

    ├── ...
    │
    ├── driver
    │   ├── DriverManager.js 
    │   
    |                
    |── pages
    |   ├── basePage.js             # Base page testing functionalities
    |   ├── loginPage.js            # Login page testing functionalities
    |   ├── taskPage.js             # Task page testing functionalities
    |  
    |  
    ├── test                        # Test suite
    │    ├── loginPage.test.js      # Automated Test Script for the login functionalities
    │    ├── taskPage.test.js       # Automated Test Script for the task functionalities
    │      
    |
    ├── utils                       # Utility files for testing           
    │    ├──repository.js           # identifier for elements to test, test data
    |
    ├── mochawesome-report          
         ├──mochawesome.html       #Test Report for the tests executed
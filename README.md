# Budget Planner

## Setup
### Server
#### Connection String
**Only do this step if you do not use MS SQL Server**

First set your connection string in `BudgetPlannerServer/BudgetPlanner/appsettings.json` according to what database you use.

#### Migrations
Then you'll have to build the database according to the scheme specified in the server. In order to do that, after opening the project in Visual Studio*, go to Tools -> NuGet Package Manager -> Package Manager Console.

And write `update-database`.

**Note**: Some people have had trouble with opening the project in Visual Studio. In order to open the project navigate to: `BudgetPlannerServer` and double click on the file named `BudgetPlanner.sln`.

#### Running
In order to run the project make sure you select `BugetPlanner` and not `IIS Express`, and then click run or press F5.

### Web Client
#### Installing packages
Navigate to `BudgetPlannerWeb/` and run `npm install`.

#### Running the project
To run the project you first have two options:
- Run it straight from the command line with `npm start`
- Create a configuration in PhpStorm and run it from there.

To create a configuration in PhpStorm go to Run -> Edit configurations... -> Click on the plus -> Select npm
Then in the field called `Scripts` select `start`. Then click OK.
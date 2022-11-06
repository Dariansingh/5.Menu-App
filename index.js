class Player {      //this is the blueprint
    constructor(name, position){
    this.name = name;
    this.position = position;
    }

    describe() {  //this method prints out information about the player
        return `${this.name} plays ${this.position}`;
    }
}

class Team {
    constructor(name){              // method that each time a team is created there will be an array 
        this.name = name;           // that has all the players on the team
        this.players = [];
    }

    addPlayer(player) {                     // method that will take a player
        if(player instanceof Player) {      // checks to see if the player is an instance of the player class and not a number or a string
            this.players.push(player);
        } else {
            throw new Error(`you can only add an instance of Player. Argument is not a player: ${player}`); //tells the user they put the wrong instance
        }
    } 

    describe() {    // returns info about the team
        return `${this.name} has ${this.players.length} players.`;
    }
}

class Menu {
    constructor() {
        this.teams = [];        // initializes the array of teams
        this.selectedTeam = null;   // shows what team is selected
    }

    start() {       // start up the application
        let selection = this.showMainMenuOptions();     //method that stores all the menu options and shows them
        while (selection != 0) {    //variable to get user input and determine what option the user chooses as long as they dont select 0
            switch (selection) {
                case '1':                //All the methods that the user can select
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('goodbye!');
    }

    showMainMenuOptions() { // return prompt is the pop up box that asks the user for input with `` as template literal for concatenation
        return prompt(`                     
            0) exit
            1) create new team
            2) view team
            3) delete team
            4) display all teams
        `);
    }

    showTeamMenuOptions(teamInfo) {
        return prompt(`
            0) back
            1) create player
            2) delete player
            ----------------------
            ${teamInfo}
        `);
    }

    displayTeams() {
        let teamString = '';   //blank string that we need to build the team for
        for(let i = 0; i < this.teams.length; i++) {        //list of all the teams the user made in the Menu class
            teamString += i + ') ' + this.teams[i].name + '\n';         //concatenates all of the teams based on the index that is chosen
        }
        alert(teamString);      // alert that allows user to see the teams
    }

    createTeam() {
        let name = prompt('Enter name for new team:');  //prompt user for team name
        this.teams.push(new Team(name));    //adds new team to the Team array
    }

    viewTeam() {
        let index = prompt('enter index of the team you wish to view:'); //user enters index of team they want to see
        if (index > -1 && index < this.teams.length) {      //validation of user input as long as user selects index that is in Team array
            this.selectedTeam = this.teams[index];
            let description  = 'Team name: ' + this.selectedTeam.name + '\n';
            
            for(let i = 0; i < this.selectedTeam.players.length; i++) {
                description += i +') ' + this.selectedTeam.players[i].name
                 + ' - ' + this.selectedTeam.players[i].position + '\n';
            }

            let selection = this.showTeamMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createPlayer();
                    break;
                case '2':
                    this.deletePlayer();
            }
        }
    }
    
    deleteTeam() {
        let index = prompt('enter the index of the team you want to delete:');
        if (index > -1 && index < this.teams.length) {
            this.team.splice(index, 1);
        }
    }

    createPlayer() {
        let name = prompt('enter name for new player:');
        let position = prompt('enter position for new player:');
        this.selectedTeam.players.push(new Player(name, position));
    }

    deleterPlayer() {
        let index = prompt('enter the index of the player you want to delete:');
        if (index > -1 && index < this.selectedTeam.players.length) {
            this.selectedTeam.players.splice(index, 1);
        }
    }

}


let menu = new Menu(); // instance of Menu
menu.start();   //method that shows everything
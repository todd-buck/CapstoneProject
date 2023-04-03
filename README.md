# Breeze Inventory Management System
Hi, welcome to our University of Alabam Capstone Project! If you have any issues with
the project, feel free to reach out to [btbuckjr@gmail.com](mailto:btbuckjr@gmail.com)
or [patrickcvest@gmail.com](mailto:patrickcvest@gmail.com).

Credits to Todd Buck, Patrick Vest, Caroline Lewis, Jared Patterson, and Wade 
Pelham for their work on the project.

## Summary
Breeze is an Inventory Management System built specifically for Dillard's Dining Resources.
This IMS was built using frameworks from Visual Studio's ASP.NET Web API alongside a React UI.
We have elected to pre-fill the embedded database with some preliminary data, but by all means,
make it your own!

##Key Features
- CRUD Features
	- Inventory Items (CRUD)
	- On-Site Storage Location (CRD)
	- Per-Location Inventory (CRU)
- Reports
	- User Action Logs
- Custom UI Themes
	- Default
	- High Contrast
	- Sea
	- Flamingo
	- Desert
	- Daisy

##Getting Started

`Note: Due to development restraints on behalf of Microsoft, Breeze IMS cannot
currently be run on Visual Studio for Mac`

To get started using Breeze, please navigate over to Visual Studio (if you do not
currently have a working copy of Visual Studio, please visit [Microsoft's Website](https://visualstudio.microsoft.com/free-developer-offers/))
and grab a free copy of Visual Studio Community.

Next, you will clone a local copy of the repository to a file path of your choosing.
Upon completion, you will likely need to navigate to the solution properties (which
can be accessed by right clicking the DDRInventory-UI.sln file). In the properties
pane, you will navigate to the "Startup Properties". You will then designate that
this program contains multiple startup project, and set both the Backend (DDRInventory)
and the Frontend (DDRInventory-UI) to start. Note that DDRInventory should be started
before DDRInventory-UI to ensure that the databases and API calls have a chance to spin up.

Finally, you should navigate to a terminal within this file structure and run the command
`npm i`. This will install all of the build dependencies outlined in package.json, and will
allow you to successfully run the application. After this is complete, simply navigate to the
DDRInventory-UI.sln file, and select "Start" from the top menu.

##Developer Notes

If you plan to make contributions to the project,Github commit messages should follow the
following format (roughly):
	
	Brief Summary (15 words max)

	Changes (3-4 items max, if mor split into separate commits)
		- [insert text]
		- [insert text]
		- [insert text]
		- [insert text]

	Notes (potential bugs, blockers):
		- Potential Bug: [insert text]
		- Potential Blocker: [insert text]

	Next Steps/Action Items:
		- [insert text]
		- [insert text]
		- [insert text]

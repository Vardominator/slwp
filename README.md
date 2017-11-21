# Sorin Lab Web Platform

## TODOs
### Front-end
* load local data into tables unless refresh button is pressed which calls api and overwrites local data
* min max filters for all parameters (DONE)
* Change frame to column name to time 
* remove dssp output (DONE)
* center data values (DONE)
* Clone filter in clone summary page
* Remove unnecessary wrapbootstrap script imports
* Update bower.json with all active packages
* Upgrade to new bootstrap admin theme (DONE)
* Added spinner load for project summary api call (DONE)
* Breadcrumb for page navigation (DONE)
* CSV download for tables (DONE)
* Cache and Refresh data tables (DONE)

## Instructions for the following must be written
* Installing python3 and pip
* Setting up, activating, and deactivating a virtual environment
* Using bower to install JS dependencies with bower.json
* How to add components from wrapbootsrap theme to pages
* Adding a database connection to the project
  * add condition for new db in db_for_read methid in FahRouter class
  * appending to DATABASES dictionary in settings.py
  * migrating, applying migrations

## 2.0 Goals
* Plot styling options
* Contour plots with dssp column

### Back-end
* min and max values (runs and projects)
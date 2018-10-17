Create a simple web interface that will allow the user to do the following tasks:

* Enter in a unit number and display to the screen all the residents of that unit.
* Enter in a first and last name and display all the information we have about that user. (Name, unit of residence, role(s) on property, and devices they are able to control.)

The "roles" key on people objects refers to the roles a user has on that property, which impacts what devices they can control.

A person may control a device if:

* It is associated with their unit of residence.
* The device is marked as admin_accessible and the user is an admin.

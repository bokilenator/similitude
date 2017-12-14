# Similitude
### A tool to help compare jobs

## Installation
Install node and git clone to a directory.  Run npm install to get dependencies.

### DB
You will need a mongo instance running to get this to work.
Adjust the connection string in models/plans.js

## How to use
Create new plans in /plan/new for jobs you want.  There are form validations to prevent bad data.
Next, select two plans in /choose to compare.  You cannot select the same plan to compare.
Finally, see both plans side by side.

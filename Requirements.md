# The demo application requirements are as given. Use MEAN stack for development.

# DB table structure:
    - Id  (primary)
    - Name  (Unique)
    - DateOfBirth (Date)
    - Role (Varchar)
    - IsActive (Boolean)

# Create a single page application to add / edit / delete users from Database which will:
  - Display a heading.
  - Display a list of users in table (Id, Name, Age(calculated to years), Role, IsActive(true/false)).
  - Display an edit link and a delete icon in all rows.
  - Have a universal filter for table (Universal filter searches in all the table fields).
  - Display an "Add User" button.
    - "Add User" and "Edit" will display a popup form with respective titles.
    - The form fields should have validation.
    - Use a date picker directive (library) for Date of Birth.
    - Name should not be editable (hint: disabled) on edit form.
    - Use same popup and form for both Add and Edit.
     -Ask for confirmation for delete (custom popup).

# Node API:
  - API for Adding records
  - API for Viewing records (should allow search)
  - API for Deleting records
  - API for Updating records
  - Must have appropriate validations

## Short term goals
- Apply for out of sandbox AWS SES

- Password reset
    - server endpoint, create new table (reset_password) with a reset password token, send email to user with link
    - /resetPassword with a query item to match reset_password token
    - Create Reset Password page and endpoint to update salted password in database

- Basic Admin dashboard to create user
    - Create new user
        - Email template for when user is created
        - Generate a random password at first
    - Edit user
        - create endpoint for update user record
        - create endpoint for delete user from users
    - Create new program
    - Edit existing program

- Basic Inactive user dashboard
    - Access to three week programs, no feedback

- Basic Active user dashboard
    - Access to all previous weeks, and feedback
    - Create a form/upload for check-in

- My Account mobile mode

## Long term goals
- Mobile App with React Native
- Thorough workout and exercises database
- Implement complex queries and filtering for admin dashboard
- Client data storage to be HIPPA complient
- Calendar integration


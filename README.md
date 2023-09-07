# caretrace
This is the basic login / register feature for caretrace.
This includes:
* Login
* Register
* Email confirmation (using emailjs)
* Password reset

This project is far from safe, but is more than enough for a proof of concept.

## How to run
This is a short guide on how to get the project up and running.
Start by installing node.js here: [https://nodejs.org/dist/v20.6.0/node-v20.6.0-x64.msi](https://nodejs.org/dist/v20.6.0/node-v20.6.0-x64.msi)
Then download git here: [https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/Git-2.42.0.2-64-bit.exe](https://github.com/git-for-windows/git/releases/download/v2.42.0.windows.2/Git-2.42.0.2-64-bit.exe)

After you've done this, you should be able to open either Terminal, CMD or PowerShell on your computer, and run the steps below.

## 1
Download/clone the repository
```sh
git clone https://github.com/DDDASHXD/caretrace.git
```

## 2
Initialize the API and Frontend
```sh
cd api
npm i
cd ../frontend
npm i
```

## 3
Once you've downloaded and initialized the two projects, open another terminal window, and run both projects.

*Terminal 1*
```sh
# Start the API
cd path_to_project/api
npm run dev
```

*Terminal 2*
```sh
# Start the frontend
cd path_to_project/frontend
npm start
```

That's it! The project should now run, and you should be able to register an account and then login.

## Disclaimer
Please be mindful of how many accounts you create, as the email service only has a limited amount of emails that can be sent, before they require payment.
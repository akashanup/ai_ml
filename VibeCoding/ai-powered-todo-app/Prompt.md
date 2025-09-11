# Prompts

## Prompt 1

```
Create a simple to-do list app, using HTML, CSS and JavaScript

Here are the main functionalities of the same

User is writing, reading and updating list of tasks on a single list
Users can add new main tasks and then add smaller, related subtasks underneath them.
The application allows users to edit the title of any task or subtask at any time.
Users can mark tasks and subtasks as complete by checking a box.
Unwanted tasks and subtasks can be removed from the list using a subtle cross button at the end.
All changes are saved automatically, so the to-do list remains intact even if the user closes the browser or the computer shuts down.
All tasks and state of those tasks should persist even when i refresh the browser
On User Experience - there should be an overall heading "My To Do App" with a list of tasks, ability to add sub-tasks to each added task and a text-box that allows me to add tasks.
```

## Prompt 2

```
Enhance the existing to-do app by adding an AI-powered feature called “Plan for Me”. This feature should:

 # User experience
 - Appear as a purple button with a magic wand icon and the label “PlanForMe”, placed next to each main task (as shown in the attached screenshot).
 - When clicked, it should:
   1. Send the main task text to a custom AI model hosted on Azure AI Foundry.
   2. Receive a response containing subtasks (not more than 10) that help accomplish the main task.
   3. Automatically populate these subtasks under the main task in the UI.

 # Model API integration and Settings UX

 - The API key and endpoint for the Azure model will be provided by the user in the Settings panel.
 - Include a “Test Connection” button in the Settings panel to verify the API setup.
 - Use secure storage to store the API credentials.
```

## Prompt 3

```
Initialize git in my current folder (if not already). Set my personal identity (git config user.name and git config user.email), add all files, and commit them as “Initial commit”. Also explain briefly what git init, git add, and git commit mean.
 
My user.name is <insert GitHub username>
My user.email is <insert email>
```

## Prompt 4

```
Add a remote named personal pointing to https://github.com/<username>/todo.git and push the local main branch to it. If I don’t have a main branch, rename the current branch to main. Show the git push output.
 
username: <insert your personal GH username>
If there are any other credentials cached, please clear them
 
I have a PAT token for authentication
```
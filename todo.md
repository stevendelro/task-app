## CURRENT TASK
  - [] Sign up sends a POST request to the backend and creates a new user.
  - [] Log in sends a POST request to the backend and retrieves a user within the DB.

## QUEUED UP
  - [] use the loggedin user to set task author.
  - [] Add a category property to to each task item in the backend.
  - [] set up the front end with a file uploader and figure out
        how to how to store and update images (something to do with multer).
  - [] add OAuth options
  - [] handle storing session related data, like currentlyLoggedIn, client-side on the browser.
  - [] test task tags
  - [] set defaults for both priority settings client-side
  - [] store user preferences in the browser with cookies. Got to do more research on this.

### UI IDEAS

- Main dashboard should have three sections: a user profile, the task list display, and HUD.

  USER PROFILE
  - [] Make a user profile component that displays an avatar, user info, and quick stats.
  - [] Fixed positon. It should always show, even if task list scrolls.
  - [] ability to set limits on how many types of priorities you can have.

  HEADS UP DISPLAY
  - [] Shows totals:
        - Stats for yesterday: Completed, missed, total made, average time.
        - Stats for today: Left to do, completed, numbers by priority/category.
          - Simple bar graph indicator for better visual input.

  TASK LIST DISPLAY
  - [] Create a "Currently working on" section with different styling.
        - Elevating a task to "Currently working on" task should start a timer.
        - Timer will be displayed alongside the task. It will have three options:
          - STOP, PAUSE and COMPLETE.
        - If task has details, accordian should be expanded.
        - On complete, the task recategorizes as complete. Currently working on empties and
          displays the title of the last task and how long it took for completion.
  - [] Single column of tasks on small screens, two columns on desktop.
        - STRETCH: Drag and drop option to change priority
  - [] Groups are grouped by simple list labels.
        - Default view is grouped by primary priority.
        - Option to view grouped by date.
        - Option to view by category.


  TASK LIST ITEMS
  - [] Recreate a similar TLI to the one in redux-primer.
  - [] It should be an expandable Accordian component.

    Accordian Summary:
      - [] When unexpanded it should display the task title, completed status, and priority.
      - [] Primary priority should be displayed as outlined chips opposite of the task title.
      - [] On completion, a filled in 'completed' chip will be added to the chip group.
      - [] Secondary priority should be displayed as icons prefacing the task title.

    Accordian Details:
      - [] On expansion, it should display the details. If no details, display a placeholder.
      - [] On expansion, below the details, display the author and time info.
      - [] On expansion, the footer will display
            - Three buttons on the left: a completion toggle, edit, and delete.
            - A button on the right to elevate to 'Currently working on"
            - "Currently working on" option will be greyed out if a task is currently being worked on.
            - "Currently working on" should toggle a modal onClick, prompting the user for timer
              options.
            - On modal submit, the task will move
      - [] On editClick, the task title and details display should transform into input fields.
      - [] On editClick, the button group should switch to 'cancel/submit.'
      - [] On editClick, the author/time area should switch to 'change priority/category'
      - [] On editSubmit, the accordian should reverse expansion and display changes.

    STRETCH GOALS:
      - [] When placed into "currently working on," task details should include task time stats.

  APPBAR
  - [] Will include the option to signout, navigate to editUser/stats pages, toggle sort options.
  - [] Sort options should come into view as a secondary appbar.
      - Sort options should be done entirely client-side. On user login, sort tasklist based on past user prefs.
      - Sort by priority, category, and time created.

STRETCH: TIMER STATS FEATURE

- Each task can have sub

  STATS PAGE?
  - [] Will display current days stats and cumulative past stats.
  - [] By the day:
      - Bar graph of number of tasks created and completed
  - [] By the week:
  - [] All time:

- Stats for yesterday: Completed, missed, total made, average time.
- Stats for today: Left to do, completed, numbers by priority/category.

## COMPLETED

  - [x] handle update password
  - [x] post a new task to user.tasklist
    - should return a unique task id
  - [x] delete a task from user.tasklist by id
    - should return deleted task id
  - [x] edit a task from user.tasklist by id
    - should return an updated task object
  - [x] fix issue with user.tasklist[0].priority.primary not showing up after createTask
  - [x] handle all the controller errors, create a global error handler.
  - [x] properly utilize res.locals
  - [x] completely remove CRA related code and files. Create and configure my own webpack.
  - [x] Handle form validation with formik.


// dummy task data:
  {
    "author": "stevendelro",
    "tasktitle": "Jumprope for a couple minutes",
    "details": "Go downstairs. Open the door. Go outside. Start.",
    "priority": {
      "primary": {
        "level": "high",
        "value": 3
      },
      "secondary": {
        "importance": "primary",
        "value": 1
      }
    },
    "completed": false,
    "tags": ["workout", "home", "fitness"]
  }



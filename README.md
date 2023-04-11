# CBT-Buddy

## Iteration 2

### Xilong Cai

Complete part of styling, and add datetime picker and map for location, together with the data type in firestore

<img src="./assets/readme/datetime.png" height="30%" width="30%" > <img src="./assets/readme/mapcbt.png" height="30%" width="30%" >

### Victor Wu

Add location button to resources, which uses latitude and longitude from Vancouver City Open Data API to calculate distance between current location and past location (my simulator's location is in San Francisco). Add button which reuses Map component from Journal to allow users to select a location on the map to find nearby therapy resources. Added address to resources and styling.

<img src="./assets/readme/iteration2/therapy_resources_locate.png" height="30%" width="30%" >

<img src="./assets/readme/iteration2/therapy_resources_distance.png" height="30%" width="30%" >

<img src="./assets/readme/iteration2/resource_map.png" height="30%" width="30%" >

<img src="./assets/readme/iteration2/resource_select_location.png" height="30%" width="30%" >

<img src="./assets/readme/iteration2/resource_distance.png" height="30%" width="30%" >

Add notification button to Journal. Asks for permission to send notifications when pressed for the first time. When pressed, it opens the app and navigates the user to the Journal page. Right now, it is 5 seconds, but in the future users can schedule when they want the notifications to occur. Added styling to Journal.

<img src="./assets/readme/iteration2/notification_permission.png" height="30%" width="30%" >

<img src="./assets/readme/iteration2/local_notification.png" height="30%" width="30%" >

<img src="./assets/readme/iteration2/journal_styling.png" height="30%" width="30%" >

Add styling to relaxation page

<img src="./assets/readme/iteration2/relaxation_styling.png" height="30%" width="30%" >
## Iteration 1

### Yiwei Tao

#### Authentication styling

#### Mood Page

Automatically jump to the next entry after selecting the corresponding mood.

<img src="./assets/readme/iteration2/signIn.png" height="30%" width="30%" >
<img src="./assets/readme/iteration2/signUp.png" height="30%" width="30%" >

#### Detail Page

This page allows you to record your thoughts in text form.

Add the function of locating the current position.

#### Photo and Location Page

Preliminary implementation of the selection of albums or photos, and open the map to manually select the location of the function.

#### Map Page

Choose your own preferred geographic location.

<img src="./assets/readme/map.png" height="30%" width="30%" >

#### Journal Page

Automatically jump to the home page after adding a location.

<img src="./assets/readme/done.png" height="30%" width="30%" >

#### Edit Page

To implement the update function, click on the corresponding entry on this page to change the corresponding content.

<img src="./assets/readme/edit.png" height="30%" width="30%" >

### Victor Wu

#### Overall Work and Firebase/Navigators

Created the project, and created folders and files for screens and components. Created firebase setup and helper files, color helper file. Added dependencies to package.json.

Created tab navigation for each feature of app. Nested Stack navigators within tab navigation for other features of app.

<img src="./assets/readme/iteration1/tabnavigation.png" height="30%" width="30%" >

#### Authentication and Profile Screen

Created login authentication through firebase. Used conditional rendering to require authentication before access to app.

<img src="./assets/readme/iteration1/loginscreen.png" height="30%" width="30%" >

Created sign up through firebase. Profile Screen with signout.

<img src="./assets/readme/iteration1/signupscreen.png" height="30%" width="30%" >
<img src="./assets/readme/iteration1/profilescreen.png" height="30%" width="30%" >

#### 3rd Party API

Use City of Vancouver Open Data to make 3rd party API call and put in a FlatList of Pressables that when clicked will give more information. (Will add more details and styling later.)

<img src="./assets/readme/iteration1/therapyresources.png" height="30%" width="30%" >
<img src="./assets/readme/iteration1/resourcesdetails.png" height="30%" width="30%" >

#### Deep Breathing Screen

Created deep breathing relaxation countdown timer that has different time intervals for breathing in, holding your breath, and breathing out.

<img src="./assets/readme/iteration1/deepbreathing.png" height="30%" width="30%" >
<img src="./assets/readme/iteration1/timedown.png" height="30%" width="30%" >
<img src="./assets/readme/iteration1/holdyourbreath.png" height="30%" width="30%" >

### Yiwei Tao

Complete initial screens of Journal. The initial screen in Journal tab is browsing all Journal entries.
<img src="./assets/readme/initial.png" height="30%" width="30%" >

#### Mood Page

Automatically jump to the next entry after selecting the corresponding mood.

<img src="./assets/readme/mood.png" height="30%" width="30%" >

#### Detail Page

This page allows you to record your thoughts in text form.

<img src="./assets/readme/text.png" height="30%" width="30%" >

#### Photo and Location Page

Preliminary implementation of the selection of albums or photos, and open the map to manually select the location of the function.

<img src="./assets/readme/camera.png" height="30%" width="30%" >

#### Map Page

Choose your own preferred geographic location.

<img src="./assets/readme/map.png" height="30%" width="30%" >

#### Journal Page

Automatically jump to the home page after adding a location.

<img src="./assets/readme/done.png" height="30%" width="30%" >

#### Edit Page

To implement the update function, click on the corresponding entry on this page to change the corresponding content.

<img src="./assets/readme/edit.png" height="30%" width="30%" >

### Xilong Cai

Complete initial screens of CBT. The initial screen in CBT tab is browsing all CBT entries.
<img src="./assets/readme/entries.png" height="30%" width="30%" >

#### Add an entry

To add an entry, users could press the plus icon on the top right corner and fill the form. At first they will describe the situation.

<img src="./assets/readme/add_description_1.png" height="30%" width="30%" > <img src="./assets/readme/add_description_2.png" height="30%" width="30%" > <img src="./assets/readme/add_description_3.png" height="30%" width="30%" >

Then they will choose the cognitive distortions.(Right is when the distortion is chosen. There will be many distortions although now there is only one)

<img src="./assets/readme/add_distortions.png" height="30%" width="30%" > <img src="./assets/readme/add_distortions_finished.png" height="30%" width="30%" >

Finally users will write how can reframe the thought.

<img src="./assets/readme/add_solution.png" height="30%" width="30%" >
Now all information has been filled, and users could review it
<img src="./assets/readme/review.png" height="30%" width="30%" >

If users press cancel, they will get back to the browsing screen. If they press edit, they will get back to the first screen of describe situation(informations filled before will be kept). If they press confirm. The new entries will be added and they will get back to the browsing screen where the new entry has been added.

<img src="./assets/readme/add_confirm.png" height="30%" width="30%" > <img src="./assets/readme/entries_added.png" height="30%" width="30%" >

#### Edit an entry

In browsing screen, users could press the card and they will get to the details screen

<img src="./assets/readme/details.png" height="30%" width="30%" >

Users could press Edit button to edit this entry. After editing, they press confirm and get back to the browsing screen where the entry has been edited.

<img src="./assets/readme/edit_confirm.png" height="30%" width="30%" > <img src="./assets/readme/entries_edited.png" height="30%" width="30%" >

#### Delete an entry

In Details page users could also press the Delete button to delete the entry. After confirming delete they will get back to the browsing screen where the entry has been deleted.

<img src="./assets/readme/delete_confirm.png" height="30%" width="30%" > <img src="./assets/readme/entries_deleted.png" height="30%" width="30%" >

## Introduction

Group Members: Xilong Cai, Yiwei Tao, and Victor Wu

Welcome to our CBT Buddy app—the perfect tool for anyone looking to improve their mental health and well-being!
Our app offers a range of evidence-based techniques from Cognitive Behavioral Therapy (CBT) to help you manage stress, anxiety, and depression. With an intuitive interface and easy-to-follow exercises, our app is perfect for beginners and experienced users alike.

Our app includes the following features:

Mood tracking and Journaling: Keep track of your moods and emotions to identify patterns and triggers. Reflect on your thoughts and feelings and identify negative thinking patterns.
Thought challenging exercises: Learn how to challenge negative thoughts and beliefs with evidence-based techniques.
Relaxation techniques: Practice mindfulness, deep breathing, and other techniques to reduce stress and anxiety.
Therapy Resources: Using Vancouver city data, find therapy resources near you.

Our app works seamlessly across both iOS and Android devices and is designed with user privacy and security in mind, so users can use it with peace of mind. With our CBT Therapy app, you'll have all the tools you need to improve your mental health and well-being.

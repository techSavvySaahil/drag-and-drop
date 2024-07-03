# Getting Started

1. You would see the default mock data provided in the form of a grid
2. While these images would be loading, you can show a loader as a placeholder
3. Clicking on any of the image would zoom it with an overlay
4. Clicking on ESC would close the overlay going back to the grid
5. You can drag and drop images to reorder them
6. This dragging and dropping would change the order and after 5 seconds of the first change, the latest order of the images would be saved
7. This saving would be triggered after every 5 seconds of the first change after the last save (Throttling)
8. While the data is being saved, you can see a loader with an overlay
9. You can also see a "Last Saved" which would tell about how much time ago the last saving of data was done

## Diving into Functionality

1. On mounting of the component, there's a fetch request which fetches the initial mock data and stores it in the local state "imageList"
2. And an event listener is added to listen to ESC key which is being removed on unmounting
3. When any image is clicked, the state "showImgInOverlay" gets the value of the clicked image which then triggers the overlay and the image is shown. And when the ESC key is pressed, this overlay goes away. This is why, we had added the eventListener for the ESC key.
4. Every image component has an attribute "data-position" with which the Container (the parent) component gets to know which image was clicked ans subsequently stores this in the showImgInOverlay state.
5. When the user drags and drops any image, it triggers reordering. There are two states that are affected ie. imageList and firstChangeDone. The firstChangeDone state is a flag which tells when the first reordering is done by the user. This is to prevent the updating of data just after the first fetch.
6. When the first reorder occurs, it sets a timeout of 5 seconds after which it modifies the state "shouldUpdate". The change in "shouldUpdate" is observed by another useEffect and it triggers the "updateData" function which updates the data in the backend (here, LocalStorage).
7. We could have directly gone with updating the data at the backend with a setTimeout also without an intermediate flag but then it would have updated a stale state if multiple reorderings were done in these 5 seconds.
8. The date and time at which the last save was done, is captured , stored in the state "lastSavedTimestamp" and the time difference is shown with the help of "moment"
9. After saving whenever the user reloads the page, the data (read order) is the same as it was before reloading.
   (This has one exceptional case when the user reorders but before it getting saved, the page is reloaded. Then, the last saved data(order) would be displayed)

### Approach and Architecture

1. Needed to create as many reusable components
2. Separation of concerns with dedicated css files for each component, where required
3. Container component for having the whole view of the page.
4. Event delegation at the Container level where the grid (or list) is rendered as child to avoid multiple listeners and boost performance
5. Throttling to avoid calling the API on every change (in this case, changing in local storage)
6. Making the API call for updating data in LocalStorage only if a change is done.

### Reusable components

1. Overlay
2. Image

### Remaining parts:

1. The API with the mock server. The documentation link for msw wasn't getting opened. So, couldn't completely integrate it and went with directly getting and setting the data from LocalStorage.
2. Stylings' improvement.
3. Deployment with docker as no prior experience with it.

### Notes:

1. Have setup the msw server but due to lack of documentation, couldn't completely integrate it. Just one step of reading the body of the PUT request was remaining. So, commented the same and went ahead with directly getting from and setting the LocalStorage.
2. Please check code for the Frontend part only as I don't have experience working in backend

# Drag and Drop

See live here, https://techsavvysaahil.github.io/drag-and-drop/

1. You will see the default mock data provided in the form of a grid
2. While these images would be loading, you can see a loader as a placeholder
3. Clicking on any image would zoom it with an overlay
4. Pressing ESC or clicking the close button would close the overlay going back to the grid
5. You can drag and drop images to reorder them
6. This dragging and dropping would change the order and after 5 seconds of the first change, the latest order of the images would be saved
7. This saving will be triggered every 5 seconds after the first change following the last save (Throttling)
8. While the data is being saved, you will see a loader with an overlay
9. You can also see a "Last Saved" message indicating how long ago the last save occurred

## Diving into Functionality

1. On mounting the component, a fetch request retrieves the initial mock data and stores it in the local state "imageList."
2. An event listener is added to listen for the ESC key and is removed on unmounting.
3. When any image is clicked, the state "showImgInOverlay" gets the value of the clicked image, triggering the overlay and displaying the image. When the ESC key is pressed, the overlay disappears. This is why we added the event listener for the ESC key. The close button also toggles the overlay visibility as the onClose prop is passed to it.
4. Every image component has a "data-position" attribute, which the Container (the parent) component uses to determine which image was clicked and subsequently stores this in the showImgInOverlay state.
5. When the user drags and drops any image, it triggers reordering. Two states are affected: imageList and firstChangeDone. The firstChangeDone state is a flag indicating when the first reordering is done by the user. This prevents updating the data immediately after the first fetch.
6. When the first reorder occurs, it sets a timeout of 5 seconds, after which it modifies the "shouldUpdate" state. The change in "shouldUpdate" is observed by another useEffect, triggering the "updateData" function, which updates the data in the backend (here, LocalStorage).
7. We could have updated the backend data directly with a setTimeout without an intermediate flag, but this could lead to updating a stale state if multiple reorderings occur within those 5 seconds.
8. The date and time of the last save are captured, stored in the "lastSavedTimestamp" state, and the time difference is shown using "moment".
9. After saving, whenever the user reloads the page, the data (read order) remains the same as it was before reloading.
   (One exception is when the user reorders, but before it is saved, the page is reloaded. In this case, the last saved data (order) will be displayed.)

### Approach and Architecture

1. Create as many reusable components as needed.
2. Separation of concerns with dedicated CSS files for each component, where required.
3. Use a Container component to manage the entire view of the page.
4. Event delegation at the Container level where the grid (or list) is rendered as a child to avoid multiple listeners and boost performance.
5. Throttling to avoid calling the API on every change (in this case, updating local storage).
6. Making the API call for updating data in LocalStorage only if a change is made.

### Reusable components

1. Overlay
2. Image

### Remaining parts:

1. The API with the mock server. The documentation link for MSW wasn't accessible, so complete integration was not possible, and I used direct data retrieval and setting from LocalStorage.
2. Deployment with Docker, as I have no prior experience with it.

### Notes:

1. Have setup the msw server but due to lack of documentation, couldn't completely integrate it. Just one step of reading the body of the PUT request was remaining. So, commented the same and went ahead with directly getting from and setting the LocalStorage.
2. Please review the code for Frontend part only as I don't have experience working in backend.

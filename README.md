# todo-list

- delete project?

- change task and project form in css

// Function to retrieve element state from localStorage and recreate elements
function retrieveAndRecreateElements() {
    const elementInfo = JSON.parse(localStorage.getItem('elementState'));

    if (elementInfo) {
        // Recreate elements using the retrieved information
        // For instance, create elements using their IDs, classes, content, etc.
        // Example:
        // document.getElementById('elementID').innerHTML = elementInfo.elementID;
        // ...
    }
}

// Call retrieveAndRecreateElements on page load
window.addEventListener('load', retrieveAndRecreateElements);

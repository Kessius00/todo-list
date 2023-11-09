# Using the Web Storage API

provides mechanisms by which browsers can securely store key/value pairs.

## Basic concepts

Storage objects are simple key-value stores (like objects) which remain intact through page loads. 

Keys & values are always strings. 

You can access these values like an object, or with the ``Storage.getItem()`` or ``Storage.setItem()`` methods.

```js
//these three lines all do the same thing
localStorage.colorSetting = "#a4509b";
localStorage["colorSetting"] = "#a4509b";
localStorage.setItem("colorSetting", "#a4509b");
```

 _It's recommended to use the Web Storage API (setItem, getItem, removeItem, key, length) to prevent the pitfalls associated with using plain objects as key-value stores._

 ### Two mechanisms with Web Storage:
 - ``sessionStorage`` maintains a separate storage area for each given origin that's available for the duration of the page session (*as long as the browser is open, including page reloads and restores*)
 - ``localStorage`` does the same thing, but persists even when browser is closed & opened

So, for example, initially calling localStorage on a document will return a Storage object; calling sessionStorage on a document will return a different Storage object. Both of these can be manipulated in the same way, but separately.


## Testing for availability
_Note: This API is available in current versions of all major browsers. Testing for availability is necessary only if you must support very old browsers, or in the limited circumstances described below._


## Example

1. in main.js, we test whether the storage object has already been populated
```js
    if (!localStorage.getItem("bgcolor")) {
        populateStorage();
    } else {
        setStyles();
    }
```
The Storage.getItem() method is used to get a data item from storage; in this case, we are testing to see whether the bgcolor item exists; if not, we run populateStorage() to add the existing customization values to the storage. If there are already values there, we run setStyles() to update the page styling with the stored values.

Note: You could also use Storage.length to test whether the storage object is empty or not.

```js
function setStyles() {
    const currentColor = localStorage.getItem("bgcolor");
    const currentFont = localStorage.getItem("font");
    const currentImage = localStorage.getItem("image");

    document.getElementById("bgcolor").value = currentColor;
    document.getElementById("font").value = currentFont;
    document.getElementById("image").value = currentImage;

    htmlElem.style.backgroundColor = `#${currentColor}`;
    pElem.style.fontFamily = currentFont;
    imgElem.setAttribute("src", currentImage);
}

```
Here, the first three lines grab the values from local storage. Next, we set the values displayed in the form elements to those values, so that they keep in sync when you reload the page. Finally, we update the styles/decorative image on the page, so your customization options come up again on reload.

### Setting values in storage
Storage.setItem() is used both to create new data items, and (if the data item already exists) update existing values. This takes two arguments — the key of the data item to create/modify, and the value to store in it.

```js
function populateStorage() {
    localStorage.setItem("bgcolor", document.getElementById("bgcolor").value);
    localStorage.setItem("font", document.getElementById("font").value);
    localStorage.setItem("image", document.getElementById("image").value);

    setStyles();
}

```

The populateStorage() function sets three items in local storage — the background color, font, and image path. It then runs the setStyles() function to update the page styles, etc.

We've also included an onchange handler on each form element so that the data and styling are updated whenever a form value is changed:

```
    bgcolorForm.onchange = populateStorage;
    fontForm.onchange = populateStorage;
    imageForm.onchange = populateStorage;
```

Storage only supports storing and retrieving strings. If you want to save other data types, you have to convert them to strings. For plain objects and arrays, you can use JSON.stringify().

```js
const person = { name: "Alex" };

//try 1
localStorage.setItem("user", person);
console.log(localStorage.getItem("user")); // "[object Object]"; not useful!

//try 2 
localStorage.setItem("user", JSON.stringify(person));
console.log(JSON.parse(localStorage.getItem("user"))); // { name: "Alex" }
```
# Responding to storage changes with the StorageEvent
The StorageEvent is fired whenever a change is made to the Storage object (note that this event is not fired for sessionStorage changes). This won't work on the same page that is making the changes — it is really a way for other pages on the domain using the storage to sync any changes that are made. Pages on other domains can't access the same storage objects.

On the events page (see _events.js_) the only JavaScript is as follows:


```js
    window.addEventListener("storage", (e) => {
        document.querySelector(".my-key").textContent = e.key;
        document.querySelector(".my-old").textContent = e.oldValue;
        document.querySelector(".my-new").textContent = e.newValue;
        document.querySelector(".my-url").textContent = e.url;
        document.querySelector(".my-storage").textContent = JSON.stringify(
            e.storageArea,
        );
    });
```

Here we add an event listener to the window object that fires when the Storage object associated with the current origin is changed. As you can see above, the event object associated with this event has a number of properties containing useful information — the key of the data that changed, the old value before the change, the new value after that change, the URL of the document that changed the storage, and the storage object itself (which we've stringified so you can see its content).


 # Links

 https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
export function placeInStorage(myList){
    const myListJSON = JSON.stringify(myList);
    localStorage.setItem("projects", myListJSON);

}

export function retrieveStorageList(){
    const storedListJSON = localStorage.getItem("projects");

    if (storedListJSON!==null){
        const storedList = JSON.parse(storedListJSON);
        return storedList
    }
    console.log(`No list found of name projects`);
    return
    
}
function lookUpProfile(name, prop) {
    // Only change code below this line

    for (let x in contacts) {
        
        if (contacts[x]['firstName'] == name) {
            if (contacts[x].hasOwnproperty(prop)) {
                return contacts[x][prop]
            } else {
                return 'No such property'
            }


        }

    }



    return 'No such contact'

    // Only change code above this line
}

console.log(filteredArray([[3, 2, 3], [1, 6, 3], [3, 13, 26], [19, 3, 9]], 3));


function filteredArray(arr, elem) {
    let newArr = [];
    // Only change code below this line
    for ( let i = 0; i<arr.length; i++){
        if (arr[i].indexof>1){
            newArr.push(arr[i])
        }
    }
    // Only change code above this line
    return newArr;
  }
  


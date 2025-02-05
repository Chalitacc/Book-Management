class UserInerface {
  //will make it connect to only this class not in other instances
  static toggleBookTypeFields(
    printedBookContainer,
    audioBookContainer,
    audioFields,
    printedFields,
    bookType
  ) {
    // HIDE BOTH CONTAINERS INITALLY
    printedBookContainer.style.display = "none";
    audioBookContainer.style.display = "none";

    // RESET THE VALUE OF BOTH CATEGORIES
    // as it is an array, you can create an empty array to reset
    printedFields.forEach((field) => (field.value = ""));
    audioFields.forEach((field) => (field.value = ""));

    // DISPLAY THE RELEVANT CONTAINER BASED ON USERS SELECTION
    if (bookType === "printed-book") {
      printedBookContainer.style.display = "block";
    } else {
      audioBookContainer.style.display = "block";
    }
  }
}

export default UserInerface;

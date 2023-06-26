import { colors } from "../values/colors";

export  function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const generateRandomColorFromArray = () => {
  var randomNumber = Math.floor(Math.random()*12)
  var arr=[colors.primary,colors.accent,colors.editTextColor,colors.darkBlueColor,colors.black,colors.linkedInColor,colors.rtrColor,colors.newColor,colors.hotJobColor,colors.favouritedColor,colors.appliedColor,colors.assessmentColor,colors.notAttemptColor];
  return arr[randomNumber];
}
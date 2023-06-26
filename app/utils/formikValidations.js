import * as yup from 'yup';

export const addCommentSchema = yup.object().shape({
  comment: yup.string().required('Please add comment.'),
});

const errorMessage = 'Required';

export const profilePersonalInfoValidationSchema = yup.object().shape({
  firstName: yup.string().required(errorMessage),
  lastName: yup.string().required(errorMessage),
  address: yup.object().required(errorMessage),
  mobile: yup.string().required(errorMessage),
  email: yup.string().email('Enter Valid Email').required(errorMessage),
  // designation : yup.string().required(errorMessage),
  // workExperience : yup.string().required(errorMessage)
});

export const profileInfoValidation = yup.object().shape({
  currentJobTitle: yup.string().required(errorMessage),
  // years: yup.number().positive("Must be more than 0"),
  // months: yup.number().when('years', {
  //   is: (years) => years === false,
  //   then: yup.number().positive("Must be more than 0"),
  // }),
  // .integer("Must be more than 0")
  // .required("This field is required"),
  // address: yup.object().required(errorMessage).nullable(true),
  // mobile: yup.string().required(errorMessage),
  // email: yup.string().email('Enter Valid Email').required(errorMessage),
  // designation : yup.string().required(errorMessage),
  // workExperience : yup.string().required(errorMessage)
});

// Forgot password
export const forgotPasswordValidationSchema = yup.object().shape({
  email: yup.string().email('Enter Valid Email').required('Please Enter your Email.'),
})

// Login 

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Enter Valid Email').required('Please Enter your Email.'),
  password: yup.string().required('Please Enter your Password.')
})


//Social Media Validations
const URL =
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
export const socialMediaValidationSchema = yup.object().shape({
  linkedIn: yup.string().matches(URL, 'Must be valid url'),
  // website: yup.string().matches(URL, 'Must be valid url'),
});

export const profileSkillsValidationSchema = yup.object().shape({
  skill: yup.string().required(errorMessage),
});

export const profileEducationValidationSchema = yup.object().shape({
  graduatedYear: yup.string().required(errorMessage),
  educationType: yup.string().required(errorMessage),
  educationProgram: yup.string().required(errorMessage),
  school: yup.string().required(errorMessage),
  major: yup.string().required(errorMessage),
});

export const resumeLanguageValidationSchema = yup.object().shape({
  language: yup.string().required(errorMessage)
})

export const profileCertificateValidationSchema = yup.object().shape({
  certificateName: yup.string().required(errorMessage),
  certificateNumber: yup.string().required(errorMessage),
  issuedBy: yup.string().required(errorMessage),
  issueDate: yup.string().required(errorMessage),
  expiryDate: yup.string().required(errorMessage),
});

export const profileAwardsAndHonorSchema = yup.object().shape({
  awardOrHonorName: yup.string().required(errorMessage),
  issuedBy: yup.string().required(errorMessage),
  issueDate: yup.string().required(errorMessage),
});

export const profileExperienceValidationSchema = yup.object().shape({
  employerName: yup.string().required(errorMessage),
  designation: yup.string().required(errorMessage),
});

export const profileLicenseValidationSchema = yup.object().shape({
  licenseName: yup.string().required(errorMessage),
  licenseNumber: yup.string().required(errorMessage),
  state: yup.string().required(errorMessage),
  startDate: yup.string().required(errorMessage),
  expiryDate: yup.string().required(errorMessage),
});

export const profileCustomSectionValidationSchema = yup.object().shape({
  heading: yup.string().required(errorMessage),
  description: yup.string().required(errorMessage),
})


// Preferences
export const preferencesCurrencyRateValidationSchema = yup.object().shape({
  // oldPassword : yup.string().required(errorMessage),
  // preferredCurrency: yup.object().required('Select your preferred currency').nullable(true),
  preferredSalary: yup.number().positive('Required'),

  // minimumHourlyRate : yup.string().required('Enter minimum hourly rate.'),
  // minimumAnnualSalary : yup.string().required('Enter minimum annual salary.'),
})

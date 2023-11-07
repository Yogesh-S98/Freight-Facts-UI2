// import * as _ from 'lodash';

import { FormGroup } from '@angular/forms';

//required error validations




//passwordValidation
  export const passwordValidation = (form: FormGroup, type: string) => {
    const  pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_])\S+$/;
    return (
      (form.get(type).touched || form.get(type).dirty) && !pattern.test(form.get(type).value)
    )
  }

// user names validation

export const userNameValidations = (event,form,type) => {
  const pattern = /^[A-Za-z\s]*$/;
  const lengthOfName = event.target.value.length;
  const targetValue = event.target.value;
  
  return event.target.value = pattern.test(event.target.value) &&  (targetValue.charAt(0) != ' ') 
    ? (lengthOfName > 2 && targetValue.charAt(lengthOfName - 1) == ' ' && targetValue.charAt(lengthOfName - 2) == ' ') ? form.get(type).value?.slice(0, -1) : event.target.value
    : form.get(type).value?.slice(0, -1);
}

//email Validation
export const checkEmailValidation = (
  form: FormGroup,
  type: string,
  emailId: string
) => {
  const regExp = new RegExp(
    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$',
    'g'
  );
  const emailErrorStatus: boolean = regExp.test(emailId) ? false : true;
  emailErrorStatus
    ? form.get(type).setErrors({ incorrect: true })
    : form.get(type).setErrors(null);
  return emailErrorStatus;
};

// password and confirm password validation

export const passwordAndConfirmPasswordValidation = (
  form,
  password,
  confirmPassword
) => {
  return (
    (form.get(password).touched ||
      form.get(password).dirty ||
      form.get(confirmPassword).touched ||
      form.get(confirmPassword).dirty) &&
    form.get(password).value !== form.get(confirmPassword).value &&
    form.get(password).value &&
    form.get(confirmPassword).value
  );
};

// password and confirm password validation

export const currentPasswordAndNewPasswordValidation = (
  form,
  currentPassword,
  newPassword
) => {
  return (
    (form.get(currentPassword).touched ||
      form.get(currentPassword).dirty ||
      form.get(newPassword).touched ||
      form.get(newPassword).dirty) &&
    form.get(currentPassword).value === form.get(newPassword).value &&
    form.get(currentPassword).value &&
    form.get(newPassword).value
  );
};

export const targetMaxValidations = (
  form: FormGroup,
  target: any,
  max: any
): boolean => {
  const diss =
    (form.get(target).touched ||
      form.get(target).dirty ||
      form.get(max).touched ||
      form.get(max).dirty) &&
    parseFloat(form.get(max).value) <= parseFloat(form.get(target).value) &&
    form.get(target).value &&
    form.get(max).value;
  return diss;
};

export const validateValues = (
  form: FormGroup,
  type: string,
  patern: any
): boolean => {
  const result =
    (form.get(type).touched || form.get(type).dirty) &&
    !patern.test(form.get(type).value);
  result ? form.controls[type].setErrors({ incorrect: true }) : '';
  return result;
};

export const ruleSetNameValidations = (
  form: FormGroup,
  type: string
): boolean => {
  const patern = /[a-zA-Z]/;
  return validateValues(form, type, patern);
};

export const inputValidations = (form: FormGroup, type: string): boolean => {
  return (
    (form.get(type)?.touched || form.get(type)?.dirty) &&
    form.get(type).errors !== null &&
    form.get(type).errors['required']
  );
};

//pattern validation
export const patterntValidations = (form: FormGroup, type: string) => {
  return (
    (form.get(type)?.touched || form.get(type)?.dirty) &&
    form.get(type).errors !== null &&
    form.get(type).errors['pattern']
  );
};

// date error validations
export const checkpickUpDate = (form, pickup, deliveryDate) => {
  return (
    (form.get(pickup).touched ||
      form.get(pickup).dirty ||
      form.get(deliveryDate).touched ||
      form.get(deliveryDate).dirty) &&
    form.get(pickup).value > form.get(deliveryDate).value &&
    form.get(pickup).value &&
    form.get(deliveryDate).value
  );
};

export const validateDifferentDates = (form,effectiveDate,expiryDate) =>{
  const status = (
    (form.get(effectiveDate).touched ||
      form.get(effectiveDate).dirty ||
      form.get(expiryDate).touched ||
      form.get(expiryDate).dirty) &&
    form.get(effectiveDate).value > form.get(expiryDate).value &&
    form.get(effectiveDate).value &&
    form.get(expiryDate).value
  );
  status ? form.controls[expiryDate].setErrors({ incorrect: true }) : '';
  return status;
}

export const checkEventInputpostiveValue = (
  event,
  form: FormGroup,
  type: string
) => {
  const targetValue = event.target.value;
  const temporaryTarget = targetValue;
  const index = targetValue.length - 1;
  //not allowed invalid characters
  if (
    targetValue.charCodeAt(index) <= 45 ||
    targetValue.charCodeAt(index) >= 58 ||
    targetValue.charCodeAt(index) === 47
  ) {
    event.target.value = targetValue.slice(0, index);
    if (targetValue.length === 1) {
      form.controls[type].setErrors({ required: true });
    }
  } else if (targetValue.charCodeAt(0) === 46) {
    event.target.value = '';
    form.controls[type].setErrors({ required: true });
  }
  //checking when user ntering multiple zeroes example 000000001
  if (targetValue.charAt(0) === '0' && targetValue.charAt(1) === '0') {
    event.target.value = '0';
  }
  //checking if 2 dot value entered
  if (temporaryTarget.split('.').length >= 3) {
    event.target.value = targetValue.slice(0, index);
  }
  //checking if dot after having more than 2 values and after . no value exist or not
  if (temporaryTarget.split('.')[1] !== undefined) {
    if (temporaryTarget.split('.')[1].length > 2) {
      event.target.value = targetValue.slice(0, index);
    } else if (
      temporaryTarget.split('.')[1].length === 0 &&
      targetValue[index] === '.'
    ) {
      form.controls[type].setErrors({ required: true });
    }
  }
};

export const checkEventInputPercentageValid = (
  event,
  form: FormGroup,
  type: string
) => {
  let targetValue = event.target.value;
  const temporaryTarget = targetValue;
  const index = targetValue.length - 1;
  if (
    targetValue.charCodeAt(index) <= 44 ||
    targetValue.charCodeAt(index) >= 58 ||
    targetValue.charCodeAt(index) === 47
  ) {
    form.controls[type].setValue(targetValue.replace(targetValue[index], ''));
    if (targetValue.length === 1) {
      form.controls[type].setErrors({ required: true });
    }
  }
  //checking if user entering data more than -100 to +100
  if (parseFloat(targetValue) < -100.0 || parseFloat(targetValue) > 100.0) {
    form.controls[type].setValue(targetValue.slice(0, index));
  }
  // check if user entering - sign except index 0 anywhere
  if (targetValue.charCodeAt(index) === 45 && index !== 0) {
    form.controls[type].setValue(targetValue.slice(0, index));
    targetValue = targetValue.slice(0, index);
  } else if (targetValue === '-0' || targetValue === '-.') {
    form.controls[type].setValue('');
    form.controls[type].setErrors({ required: true });
  }

  if (targetValue === '-') {
    form.controls[type].setErrors({ required: true });
  }
  //checking when user entering multiple zeroes
  if (targetValue.charAt(0) === '0' && targetValue.charAt(1) === '0') {
    form.controls[type].setValue('0');
  }
  //checking if 2 dot value entered
  if (temporaryTarget.split('.').length >= 3) {
    form.controls[type].setValue(targetValue.slice(0, index));
  }
  //checking if dot after having more than 2 values and after . no value exist or not
  if (temporaryTarget.split('.')[1] !== undefined) {
    if (temporaryTarget.split('.')[1].length > 2) {
      form.controls[type].setValue(targetValue.slice(0, index));
    } else if (
      temporaryTarget.split('.')[1].length === 0 &&
      targetValue[index] === '.' &&
      temporaryTarget.split('.')[0].length === 0
    ) {
      form.controls[type].setValue('');
      form.controls[type].setErrors({ required: true });
    }
  }
};

export const checkEventInputPostivePercentageValue = (
  event: any,
  form: FormGroup,
  type: string
) => {
  const targetValue = event.target.value;
  const temporaryTarget = targetValue;
  const index = targetValue.length - 1;
  //not allowed invalid characters
  if (
    targetValue.charCodeAt(index) <= 45 ||
    targetValue.charCodeAt(index) >= 58 ||
    targetValue.charCodeAt(index) === 47
  ) {
    event.target.value = targetValue.slice(0, index);
    if (targetValue.length === 1) {
      form.controls[type].setErrors({ required: true });
    }
  } else if (targetValue.charCodeAt(0) === 46) {
    event.target.value = '';
    form.controls[type].setErrors({ required: true });
  }

  //checking if user entering data more than -100 to +100
  if (parseFloat(targetValue) < 1 || parseFloat(targetValue) > 100.0) {
    form.controls[type].setValue(targetValue.slice(0, index));
  }

  //checking when user ntering multiple zeroes example 000000001
  if (targetValue.charAt(0) === '0' && targetValue.charAt(1) === '0') {
    event.target.value = '0';
  }
  //checking if 2 dot value entered
  if (temporaryTarget.split('.').length >= 3) {
    event.target.value = targetValue.slice(0, index);
  }
  //checking if dot after having more than 2 values and after . no value exist or not
  if (temporaryTarget.split('.')[1] !== undefined) {
    if (temporaryTarget.split('.')[1].length > 2) {
      event.target.value = targetValue.slice(0, index);
    } else if (
      temporaryTarget.split('.')[1].length === 0 &&
      targetValue[index] === '.'
    ) {
      form.controls[type].setErrors({ required: true });
    }
  }
};

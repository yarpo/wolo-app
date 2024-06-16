import i18n from 'i18next'; 

const passwordValidator = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push(i18n.t('passwordErrors.minLength'));
  }
  if (!/[a-z]/.test(password)) {
    errors.push(i18n.t('passwordErrors.lowercase'));
  }
  if (!/[A-Z]/.test(password)) {
    errors.push(i18n.t('passwordErrors.uppercase'));
  }
  if (!/[0-9]/.test(password)) {
    errors.push(i18n.t('passwordErrors.number'));
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push(i18n.t('passwordErrors.specialCharacter'));
  }

  return errors;
};

export default passwordValidator;
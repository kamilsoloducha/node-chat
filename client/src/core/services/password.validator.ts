export function validatePassword({ password }: { password: string | undefined }): string | undefined {
  if (!password) {
    return 'Field is required.';
  } else {
    if (password.length < 5) {
      return 'Password has to be 5 characters length at least.';
    }
  }
}

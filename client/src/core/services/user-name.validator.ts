export function validateUserName({ userName }: { userName: string | undefined }): string | undefined {
  if (!userName) {
    return 'Field is required.';
  } else {
    if (userName.length < 5) {
      return 'User name has to be 5 characters length at least.';
    }
  }
  return undefined;
}

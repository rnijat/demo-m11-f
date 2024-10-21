export const titleAvatarHelper = (firstName: string | undefined, lastName: string | undefined) => {
  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  } else if (firstName) {
    return firstName.charAt(0)
  } else if (lastName) {
    return lastName.charAt(0)
  } else {
    return ''
  }
}
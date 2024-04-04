

function generateUniqueId() {
  // This is a simple implementation to generate a unique ID using a timestamp
  // It's not cryptographically secure and might lead to collisions in rare cases

  // Generate a random number between 0 and 9999
  const randomNumber = Math.floor(Math.random() * 10000)

  // Get the current timestamp
  const timestamp = Date.now()

  // Concatenate the timestamp and random number to create a unique ID
  const uniqueId = `${timestamp}${randomNumber}`

  return uniqueId
}

export default generateUniqueId
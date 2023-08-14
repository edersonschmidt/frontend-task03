const { faker } = require("@faker-js/faker")

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

module.exports = () => {
  const data = {
    movies: [],
  }

  for (let i = 1; i <= 1000; i++) {
    data.movies.push({
      id: `movie-${i}`,
      title: capitalizeFirstLetter(faker.lorem.words()),
      director: faker.person.fullName(),
      description: faker.lorem.paragraph(),
      year: faker.date.past({ years: 10 }).getFullYear(),
      coverImage: faker.image.urlLoremFlickr({ category: "business" }),
    })
  }

  return data
}

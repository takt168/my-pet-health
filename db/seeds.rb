# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

peanut = Pet.create(
  [{
    name: "Peanut",
    description: "second dog",
    species: "dog",
    breed: "Miniature Pinscher",
    birth_date: DateTime.new(2008, 4, 24),
    image_url:"https://res.cloudinary.com/du4z2ezqn/image/upload/v1574562863/Screen_Shot_2019-11-23_at_9.33.33_PM_r40eyg.png"
  }]
)

rabiesShot = Event.create(
  [{
    name: "Rabies Vaccination",
    # type: "Vaccination",
    event_date: DateTime.new(2018, 1, 22),
    expiration_date: DateTime.new(2021, 1, 22),
    pet_id: 1
  },
{
  name: "Pet Registration",
  # type: "License",
  event_date: DateTime.new(2019, 1, 6),
  expiration_date: DateTime.new(2020, 1, 1),
  pet_id: 1

}]
)

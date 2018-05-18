namespace :user do
  task init: :environment do
    User.create(first_name: Faker::Name.last_name,
      last_name: Faker::Name.last_name,
      email: "admin@gmail.com",
      password: "12345678",
      password_confirmation: "12345678",
      role: "admin")

    User.create(first_name: Faker::Name.last_name,
      last_name: Faker::Name.last_name,
      email: "student@gmail.com",
      password: "12345678",
      password_confirmation: "12345678",
      role: "student",
      class_name_id: 1)

    User.create(first_name: Faker::Name.last_name,
      last_name: Faker::Name.last_name,
      email: "super_student@gmail.com",
      password: "12345678",
      password_confirmation: "12345678",
      role: "super_student",
      class_name_id: 1)

    User.create(first_name: Faker::Name.last_name,
      last_name: Faker::Name.last_name,
      email: "teacher@gmail.com",
      password: "12345678",
      password_confirmation: "12345678",
      role: "teacher",
      class_name_id: 1)
  end
end

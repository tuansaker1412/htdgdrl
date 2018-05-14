namespace :user do
  task init: :environment do
    User.create(first_name: Faker::Name.last_name,
      last_name: Faker::Name.last_name,
      username: "test",
      email: "test@gmail.com",
      password: "12345678",
      password_confirmation: "12345678",
      role: "member")
  end
end

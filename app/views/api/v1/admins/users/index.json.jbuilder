json.code 1
json.data @users do |user|
  json.merge! user.attributes
  json.role user.role
  json.birthday user.birthday.strftime('%d/%m/%Y') rescue nil
  json.class_name user.class_name.name rescue nil
end
json.per_page Settings.per_page
json.page params[:page]
json.total @users.total_entries

json.code 1
json.message "success"
json.data do
  json.merge! @form.attributes
  json.first_name @form.user.first_name
  json.last_name @form.user.first_name
  json.birthday @form.user.birthday
  json.mssv @form.user.mssv
  json.class_name @form.user.class_name.name
end

json.code 1
json.data @forms do |form|
  json.merge! form.attributes
  json.first_name form.user.first_name
  json.last_name form.user.first_name
  json.birthday form.user.birthday
  json.mssv form.user.mssv
  json.class_name form.user.class_name.name
end
json.per_page Settings.per_page
json.page params[:page]
json.total @forms.total_entries

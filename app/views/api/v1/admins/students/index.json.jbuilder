json.code 1
json.data @students do |student|
  json.merge! student.attributes
  json.role student.role
  json.birthday student.birthday.strftime('%d/%m/%Y') rescue nil
  json.class_name student.class_name.name rescue nil
end
json.per_page Settings.per_page
json.page params[:page]
json.total @students.total_entries

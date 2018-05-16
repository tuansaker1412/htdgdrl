class Form < ActiveRecord::Base
  belongs_to :user

  enum status: {student: 0, super_student: 1, teacher: 2, admin: 3, complete: 4}

  validates :session, presence: true
  validates :year, presence: true
  validates :form, presence: true
  validates :total, presence: true
end

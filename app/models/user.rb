class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :recoverable, :lockable, :trackable

  belongs_to :class_name
  has_many :forms, dependent: :destroy

  enum role: {student: 0, super_student: 1, teacher: 2, admin: 3}

  validates :role, presence: true

  def active?
    status == "active"
  end
end
